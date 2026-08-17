import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel with your project token 
const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

// Initialize Mixpanel
if (MIXPANEL_TOKEN) {
    mixpanel.init(MIXPANEL_TOKEN, {
        debug: import.meta.env.DEV, // Enable debug mode in development
        track_pageview: false, // We'll handle page views manually
        persistence: 'localStorage',
    });
} else {
    console.warn('Mixpanel Token not found, analytics disabled');
}

// Internal helper for consistent tracking
const track = (eventName: string, properties?: Record<string, any>) => {
    if (!MIXPANEL_TOKEN) return;

    if (import.meta.env.DEV) {
        console.log(`[Mixpanel] Tracking: ${eventName}`, properties);
    }
    mixpanel.track(eventName, {
        timestamp: new Date().toISOString(),
        ...properties,
    });
};

// User identification
export const identifyUser = (userId: string, properties?: Record<string, any>) => {
    if (!MIXPANEL_TOKEN) return;

    mixpanel.identify(userId);
    if (properties) {
        mixpanel.people.set(properties);
    }
};

export const resetUser = () => {
    if (!MIXPANEL_TOKEN) return;
    mixpanel.reset();
};

// Authentication Events
export const trackSignup = (userId: string, method: 'email' | 'google', properties?: Record<string, any>) => {
    track('User Signup', {
        user_id: userId,
        signup_method: method,
        ...properties,
    });
};

export const trackLogin = (userId: string, method: 'email' | 'google', properties?: Record<string, any>) => {
    track('User Login', {
        user_id: userId,
        login_method: method,
        ...properties,
    });
};

export const trackLogout = (userId: string) => {
    track('User Logout', {
        user_id: userId,
    });
};

// Page View Tracking
export const trackPageView = (pageName: string, path: string, properties?: Record<string, any>) => {
    track('Page View', {
        page_name: pageName,
        page_path: path,
        ...properties,
    });
};

// Subscription Funnel Events
export const trackSubscriptionPageView = (properties?: Record<string, any>) => {
    track('Viewed Subscription Plans', {
        page: 'rates',
        ...properties,
    });
};

export const trackPlanSelected = (planType: string, planDuration: string, price: string) => {
    track('Plan Selected', {
        plan_type: planType,
        plan_duration: planDuration,
        price: price,
    });
};

export const trackPurchaseInitiated = (planType: string, planDuration: string, price: string) => {
    track('Purchase Initiated', {
        plan_type: planType,
        plan_duration: planDuration,
        price: price,
    });
};

export const trackPurchaseCompleted = (
    userId: string,
    planType: string,
    planDuration: string,
    price: string,
    transactionId?: string
) => {
    track('Purchase Completed', {
        user_id: userId,
        plan_type: planType,
        plan_duration: planDuration,
        price: price,
        transaction_id: transactionId,
    });

    // Track revenue
    if (MIXPANEL_TOKEN) {
        mixpanel.people.track_charge(parseFloat(price.replace(/[^0-9.]/g, '')));
    }
};

// Content Interaction Events
export const trackContentClick = (
    contentType: 'free' | 'premium',
    sectionName: string,
    userPlan: string,
    properties?: Record<string, any>
) => {
    const eventName = contentType === 'premium' ? 'Premium Content Clicked' : 'Free Content Clicked';
    track(eventName, {
        content_type: contentType,
        section_name: sectionName,
        user_plan: userPlan,
        ...properties,
    });
};

export const trackPremiumFeatureLocked = (featureName: string, userPlan: string) => {
    track('Premium Feature Locked Interaction', {
        feature_name: featureName,
        user_plan: userPlan,
    });
};

// User Activity Events
export const trackProfileUpdate = (userId: string, updatedFields: string[]) => {
    track('Profile Updated', {
        user_id: userId,
        updated_fields: updatedFields,
    });
};

export const trackMatrixSaved = (userId: string, matrixType: string) => {
    track('Matrix Saved', {
        user_id: userId,
        matrix_type: matrixType,
    });
};

export const trackMatrixDeleted = (userId: string, matrixType: string) => {
    track('Matrix Deleted', {
        user_id: userId,
        matrix_type: matrixType,
    });
};

export const trackDiaryEntry = (userId: string, action: 'created' | 'updated' | 'deleted') => {
    track('Diary Entry', {
        user_id: userId,
        action: action,
    });
};

export const trackCompatibilityCheck = (userId: string, compatibilityType: string) => {
    track('Compatibility Check', {
        user_id: userId,
        compatibility_type: compatibilityType,
    });
};

// Generic event tracking
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    track(eventName, properties);
};

// Export mixpanel instance for advanced usage
export { mixpanel };
