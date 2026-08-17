#!/bin/bash

# Deploy to existing Azure Web App: destiny-chart-v2
# Resource Group: Soul-Plus-AI

set -e

echo "🚀 Deploying to existing Web App: destiny-chart-v2..."

# Configuration
RESOURCE_GROUP="Soul-Plus-AI"
APP_NAME="destiny-chart-v2"
ACR_NAME="soulplusacr"  # We'll create this if it doesn't exist

# Step 1: Check Azure login
echo "📋 Checking Azure login status..."
if ! az account show > /dev/null 2>&1; then
    echo "Please login to Azure:"
    az login
fi

# Step 2: Check if ACR exists, create if needed
echo "🐳 Checking Azure Container Registry..."
if ! az acr show --name $ACR_NAME --resource-group $RESOURCE_GROUP > /dev/null 2>&1; then
    echo "Creating Azure Container Registry..."
    az acr create \
        --resource-group $RESOURCE_GROUP \
        --name $ACR_NAME \
        --sku Basic \
        --admin-enabled true \
        --output table
    echo "✅ Container Registry created"
else
    echo "✅ Container Registry exists"
fi

# Step 3: Build and push Docker image to ACR
echo "🔨 Building and pushing Docker image..."
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
az acr build \
    --registry $ACR_NAME \
    --image destiny-chart-insight:latest \
    --image destiny-chart-insight:$TIMESTAMP \
    --file Dockerfile \
    . \
    --output table

echo "✅ Image built and pushed: destiny-chart-insight:latest"

# Step 4: Get ACR credentials
echo "🔐 Getting ACR credentials..."
ACR_USERNAME=$(az acr credential show --name $ACR_NAME --query username --output tsv)
ACR_PASSWORD=$(az acr credential show --name $ACR_NAME --query passwords[0].value --output tsv)
ACR_LOGIN_SERVER=$(az acr show --name $ACR_NAME --query loginServer --output tsv)

# Step 5: Update Web App to use the new container
echo "📦 Updating Web App container configuration..."
az webapp config container set \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --docker-custom-image-name ${ACR_LOGIN_SERVER}/destiny-chart-insight:latest \
    --docker-registry-server-url https://${ACR_LOGIN_SERVER} \
    --docker-registry-server-user $ACR_USERNAME \
    --docker-registry-server-password $ACR_PASSWORD \
    --output table

# Step 6: Configure environment variables
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

# Step 7: Set sensitive keys (if provided as environment variables)
if [ ! -z "$SUPABASE_KEY" ]; then
    echo "Setting Supabase key..."
    az webapp config appsettings set \
        --resource-group $RESOURCE_GROUP \
        --name $APP_NAME \
        --settings VITE_SUPABASE_PUBLISHABLE_KEY="$SUPABASE_KEY" \
        --output none
fi

if [ ! -z "$AZURE_AI_KEY" ]; then
    echo "Setting Azure AI key..."
    az webapp config appsettings set \
        --resource-group $RESOURCE_GROUP \
        --name $APP_NAME \
        --settings VITE_AZURE_AI_KEY="$AZURE_AI_KEY" \
        --output none
fi

# Step 8: Enable continuous deployment from ACR
echo "🔄 Enabling continuous deployment..."
az webapp deployment container config \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --enable-cd true \
    --output none

# Step 9: Restart the Web App
echo "♻️  Restarting Web App..."
az webapp restart \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --output none

# Step 10: Get the URL
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
echo "⚠️  If you haven't set sensitive keys, run:"
echo "export SUPABASE_KEY='your-key'"
echo "export AZURE_AI_KEY='your-key'"
echo "Then run this script again, or set them manually:"
echo ""
echo "az webapp config appsettings set --resource-group $RESOURCE_GROUP --name $APP_NAME --settings VITE_SUPABASE_PUBLISHABLE_KEY='<key>'"
echo "az webapp config appsettings set --resource-group $RESOURCE_GROUP --name $APP_NAME --settings VITE_AZURE_AI_KEY='<key>'"
echo ""
echo "📊 Useful commands:"
echo "  View logs:    az webapp log tail --name $APP_NAME --resource-group $RESOURCE_GROUP"
echo "  View config:  az webapp config appsettings list --name $APP_NAME --resource-group $RESOURCE_GROUP --output table"
echo "  Restart:      az webapp restart --name $APP_NAME --resource-group $RESOURCE_GROUP"
echo ""
