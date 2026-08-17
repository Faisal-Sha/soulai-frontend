#!/bin/bash

# Destiny Chart Insight - Azure Web App Deployment Script
# This script deploys the React application to Azure Web App using Docker

set -e

echo "🚀 Starting deployment to Azure Web App..."

# Configuration
RESOURCE_GROUP="rg-destiny-chart"
APP_NAME="destiny-chart-insight"
LOCATION="eastus2"
ACR_NAME="destinychartacr"
SKU="B1"  # Basic tier - suitable for production

# Step 1: Login to Azure
echo "📋 Checking Azure login status..."
if ! az account show > /dev/null 2>&1; then
    echo "Please login to Azure:"
    az login
fi

# Get subscription ID
SUBSCRIPTION_ID=$(az account show --query id --output tsv)
echo "Using subscription: $SUBSCRIPTION_ID"

# Step 2: Create Resource Group
echo "📦 Creating resource group..."
az group create \
    --name $RESOURCE_GROUP \
    --location $LOCATION \
    --output table

# Step 3: Create Azure Container Registry
echo "🐳 Creating Azure Container Registry..."
if ! az acr show --name $ACR_NAME --resource-group $RESOURCE_GROUP > /dev/null 2>&1; then
    az acr create \
        --resource-group $RESOURCE_GROUP \
        --name $ACR_NAME \
        --sku Basic \
        --admin-enabled true \
        --output table
    echo "✅ Container Registry created"
else
    echo "✅ Container Registry already exists"
fi

# Step 4: Build and push Docker image
echo "🔨 Building Docker image..."
az acr build \
    --registry $ACR_NAME \
    --image destiny-chart-insight:latest \
    --image destiny-chart-insight:$(date +%Y%m%d-%H%M%S) \
    --file Dockerfile \
    . \
    --output table

# Step 5: Get ACR credentials
ACR_USERNAME=$(az acr credential show --name $ACR_NAME --query username --output tsv)
ACR_PASSWORD=$(az acr credential show --name $ACR_NAME --query passwords[0].value --output tsv)
ACR_LOGIN_SERVER=$(az acr show --name $ACR_NAME --query loginServer --output tsv)

# Step 6: Create App Service Plan
echo "📋 Creating App Service Plan..."
PLAN_NAME="${APP_NAME}-plan"
if ! az appservice plan show --name $PLAN_NAME --resource-group $RESOURCE_GROUP > /dev/null 2>&1; then
    az appservice plan create \
        --name $PLAN_NAME \
        --resource-group $RESOURCE_GROUP \
        --is-linux \
        --sku $SKU \
        --output table
    echo "✅ App Service Plan created"
else
    echo "✅ App Service Plan already exists"
fi

# Step 7: Create Web App
echo "🌐 Creating Web App..."
if ! az webapp show --name $APP_NAME --resource-group $RESOURCE_GROUP > /dev/null 2>&1; then
    az webapp create \
        --resource-group $RESOURCE_GROUP \
        --plan $PLAN_NAME \
        --name $APP_NAME \
        --deployment-container-image-name ${ACR_LOGIN_SERVER}/destiny-chart-insight:latest \
        --output table
    echo "✅ Web App created"
else
    echo "✅ Web App already exists, updating..."
    az webapp config container set \
        --name $APP_NAME \
        --resource-group $RESOURCE_GROUP \
        --docker-custom-image-name ${ACR_LOGIN_SERVER}/destiny-chart-insight:latest \
        --docker-registry-server-url https://${ACR_LOGIN_SERVER} \
        --docker-registry-server-user $ACR_USERNAME \
        --docker-registry-server-password $ACR_PASSWORD \
        --output table
fi

# Step 8: Configure container registry credentials
echo "🔐 Configuring container registry credentials..."
az webapp config container set \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --docker-custom-image-name ${ACR_LOGIN_SERVER}/destiny-chart-insight:latest \
    --docker-registry-server-url https://${ACR_LOGIN_SERVER} \
    --docker-registry-server-user $ACR_USERNAME \
    --docker-registry-server-password $ACR_PASSWORD

# Step 9: Configure environment variables
echo "⚙️  Configuring environment variables..."
az webapp config appsettings set \
    --resource-group $RESOURCE_GROUP \
    --name $APP_NAME \
    --settings \
        VITE_SUPABASE_PROJECT_ID="zinfmmyxkcafmurkznyh" \
        VITE_SUPABASE_URL="https://zinfmmyxkcafmurkznyh.supabase.co" \
        VITE_AZURE_AI_ENDPOINT="https://soulplus-af.openai.azure.com" \
        VITE_AZURE_AI_MODEL="destiny-matrix-model" \
        WEBSITES_PORT=80 \
    --output table

# Note: For production, store sensitive keys in Azure Key Vault
echo ""
echo "⚠️  IMPORTANT: Set sensitive environment variables manually:"
echo "   VITE_SUPABASE_PUBLISHABLE_KEY"
echo "   VITE_AZURE_AI_KEY"
echo ""
echo "Run these commands to set them:"
echo "az webapp config appsettings set --resource-group $RESOURCE_GROUP --name $APP_NAME --settings VITE_SUPABASE_PUBLISHABLE_KEY='<your-key>'"
echo "az webapp config appsettings set --resource-group $RESOURCE_GROUP --name $APP_NAME --settings VITE_AZURE_AI_KEY='<your-key>'"
echo ""

# Step 10: Enable continuous deployment
echo "🔄 Enabling continuous deployment from ACR..."
az webapp deployment container config \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --enable-cd true

# Step 11: Get the URL
APP_URL=$(az webapp show \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --query "defaultHostName" \
    --output tsv)

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "🌍 Your application is available at: https://$APP_URL"
echo ""
echo "📊 Useful commands:"
echo "  View logs:    az webapp log tail --name $APP_NAME --resource-group $RESOURCE_GROUP"
echo "  Restart app:  az webapp restart --name $APP_NAME --resource-group $RESOURCE_GROUP"
echo "  View config:  az webapp config appsettings list --name $APP_NAME --resource-group $RESOURCE_GROUP"
echo ""
