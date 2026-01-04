import React, { useState } from 'react';
import {
    ArrowLeft,
    ArrowRight,
    Check,
    ClipboardCheck,
    User,
    Target,
    Heart,
    Sparkles,
    Settings,
    Gift,
    Loader2,
    Home
} from 'lucide-react';
import { useAssessment } from '../hooks/useAssessment';
import type { AssessmentResponse } from '../types';

// Step configuration
const STEPS = [
    { id: 'welcome', title: 'Welcome', icon: Sparkles },
    { id: 'personal', title: 'About You', icon: User },
    { id: 'goals', title: 'Your Goals', icon: Target },
    { id: 'medical', title: 'Health Info', icon: Heart },
    { id: 'experience', title: 'Experience', icon: ClipboardCheck },
    { id: 'preferences', title: 'Preferences', icon: Settings },
    { id: 'results', title: 'Results', icon: Gift }
];

// Options
const AGE_RANGES = [
    '18-24', '25-34', '35-44', '45-54', '55-64', '65+'
];

const GOALS = [
    { id: 'weight_loss', label: 'Weight Loss', emoji: '⚖️' },
    { id: 'muscle_building', label: 'Muscle Building', emoji: '💪' },
    { id: 'anti_aging', label: 'Anti-Aging', emoji: '✨' },
    { id: 'energy', label: 'Increased Energy', emoji: '⚡' },
    { id: 'sleep', label: 'Better Sleep', emoji: '😴' },
    { id: 'recovery', label: 'Faster Recovery', emoji: '🏃' },
    { id: 'skin_health', label: 'Skin Health', emoji: '🌟' },
    { id: 'cognitive', label: 'Mental Clarity', emoji: '🧠' },
    { id: 'immune', label: 'Immune Support', emoji: '🛡️' },
    { id: 'hormone', label: 'Hormone Balance', emoji: '⚗️' }
];

const MEDICAL_CONDITIONS = [
    { id: 'none', label: 'None of the below', emoji: '✅' },
    { id: 'diabetes', label: 'Diabetes', emoji: '💉' },
    { id: 'thyroid', label: 'Thyroid Condition', emoji: '🦋' },
    { id: 'heart', label: 'Heart Condition', emoji: '❤️' },
    { id: 'kidney', label: 'Kidney Issues', emoji: '🫘' },
    { id: 'liver', label: 'Liver Issues', emoji: '🫀' },
    { id: 'cancer_history', label: 'Cancer History', emoji: '🎗️' },
    { id: 'pregnant', label: 'Pregnant/Nursing', emoji: '🤰' },
    { id: 'autoimmune', label: 'Autoimmune Disorder', emoji: '🔬' },
    { id: 'medication', label: 'On Medications', emoji: '💊' }
];

const EXPERIENCE_LEVELS = [
    { id: 'none', label: 'Complete Beginner', description: "I've never used peptides before" },
    { id: 'research', label: 'Researching', description: "I've been learning but haven't started" },
    { id: 'beginner', label: 'Beginner', description: "I've tried 1-2 peptides" },
    { id: 'intermediate', label: 'Intermediate', description: "I've used several peptides" },
    { id: 'advanced', label: 'Advanced', description: 'Experienced with multiple protocols' }
];

const BUDGET_RANGES = [
    { id: 'budget', label: 'Budget-Friendly', description: 'Under ₱5,000/month' },
    { id: 'moderate', label: 'Moderate', description: '₱5,000 - ₱15,000/month' },
    { id: 'premium', label: 'Premium', description: '₱15,000 - ₱30,000/month' },
    { id: 'unlimited', label: 'Best Results', description: 'Investment in optimal results' }
];

const FREQUENCY_OPTIONS = [
    { id: 'daily', label: 'Daily', description: 'I can commit to daily use' },
    { id: 'weekly', label: 'Weekly', description: 'A few times per week works better' },
    { id: 'monthly', label: 'Monthly', description: 'Less frequent is preferred' }
];

type FormData = Omit<AssessmentResponse, 'id' | 'created_at' | 'status' | 'recommendation_generated'>;

const PeptideAssessment: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState<AssessmentResponse | null>(null);
    const { submitAssessment, loading, error } = useAssessment();

    const [formData, setFormData] = useState<FormData>({
        full_name: '',
        email: '',
        age_range: '',
        location: '',
        goals: [],
        medical_history: [],
        experience_level: '',
        preferences: {
            budget: '',
            frequency: ''
        },
        consent_agreed: false
    });

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleGoalToggle = (goalId: string) => {
        setFormData(prev => ({
            ...prev,
            goals: prev.goals.includes(goalId)
                ? prev.goals.filter(g => g !== goalId)
                : [...prev.goals, goalId]
        }));
    };

    const handleMedicalToggle = (conditionId: string) => {
        if (conditionId === 'none') {
            setFormData(prev => ({
                ...prev,
                medical_history: prev.medical_history.includes('none') ? [] : ['none']
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                medical_history: prev.medical_history.includes(conditionId)
                    ? prev.medical_history.filter(c => c !== conditionId)
                    : [...prev.medical_history.filter(c => c !== 'none'), conditionId]
            }));
        }
    };

    const handleSubmit = async () => {
        if (!formData.consent_agreed) {
            alert('Please agree to the consent to proceed.');
            return;
        }

        const response = await submitAssessment(formData);
        if (response) {
            setResult(response);
            setSubmitted(true);
        }
    };

    // Validation per step
    const isStepValid = (): boolean => {
        switch (STEPS[currentStep].id) {
            case 'welcome':
                return formData.consent_agreed;
            case 'personal':
                return formData.full_name.trim() !== '' &&
                    formData.email.trim() !== '' &&
                    formData.age_range !== '';
            case 'goals':
                return formData.goals.length > 0;
            case 'medical':
                return formData.medical_history.length > 0;
            case 'experience':
                return formData.experience_level !== '';
            case 'preferences':
                return formData.preferences.budget !== '' && formData.preferences.frequency !== '';
            default:
                return true;
        }
    };

    // Progress percentage
    const progress = ((currentStep + 1) / STEPS.length) * 100;

    // Results screen
    if (submitted && result) {
        return (
            <div className="min-h-screen bg-luxury-black flex items-center justify-center px-4 py-12">
                <div className="max-w-2xl w-full">
                    <div className="bg-luxury-charcoal rounded-sm p-8 md:p-12 text-center border border-gold-400/20">
                        <div className="bg-gold-400/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold-400/30">
                            <Check className="w-14 h-14 text-gold-400" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gold-400 mb-4">
                            Assessment Complete!
                        </h1>
                        <p className="text-luxury-cream/70 mb-8 text-lg">
                            Thank you for completing the peptide compatibility assessment. Our team will review your responses and prepare personalized recommendations for you.
                        </p>

                        <div className="bg-luxury-black/50 rounded-sm p-6 mb-8 text-left border border-gold-400/10">
                            <h3 className="font-bold text-gold-400 mb-4">What Happens Next?</h3>
                            <ul className="space-y-3 text-luxury-cream/70">
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-400 font-bold">1.</span>
                                    <span>Our peptide specialists will review your assessment</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-400 font-bold">2.</span>
                                    <span>You'll receive personalized product recommendations via email</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold-400 font-bold">3.</span>
                                    <span>Optional consultation available for detailed guidance</span>
                                </li>
                            </ul>
                        </div>

                        {result.recommendation_generated?.notes?.length > 0 && (
                            <div className="bg-gold-400/5 rounded-sm p-6 mb-8 text-left border border-gold-400/20">
                                <h3 className="font-bold text-gold-400 mb-3">Initial Insights</h3>
                                <ul className="space-y-2 text-luxury-cream/70 text-sm">
                                    {result.recommendation_generated.notes.map((note: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <Sparkles className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                                            <span>{note}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full bg-gold-400 hover:bg-gold-300 text-black py-4 rounded-sm font-bold text-lg transition-all flex items-center justify-center gap-2"
                        >
                            <Home className="w-5 h-5" />
                            Return to Shop
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-luxury-black">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-luxury-charcoal border-b border-gold-400/20">
                <div className="h-1 bg-luxury-black">
                    <div
                        className="h-full bg-gold-400 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="text-luxury-cream/60 hover:text-gold-400 transition-colors flex items-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="hidden sm:inline">Exit</span>
                        </button>
                        <div className="flex items-center gap-2">
                            {STEPS.map((step, idx) => (
                                <div
                                    key={step.id}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${idx === currentStep
                                        ? 'bg-gold-400 text-black'
                                        : idx < currentStep
                                            ? 'bg-gold-400/30 text-gold-400'
                                            : 'bg-luxury-black text-luxury-cream/40'
                                        }`}
                                >
                                    {idx < currentStep ? <Check className="w-4 h-4" /> : idx + 1}
                                </div>
                            ))}
                        </div>
                        <span className="text-luxury-cream/60 text-sm">
                            Step {currentStep + 1} of {STEPS.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="pt-36 md:pt-32 pb-32 px-4">
                <div className="container mx-auto max-w-2xl">
                    {/* Welcome Step */}
                    {STEPS[currentStep].id === 'welcome' && (
                        <div className="text-center animate-fadeIn">
                            <div className="bg-gold-400/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold-400/30">
                                <Sparkles className="w-10 h-10 text-gold-400" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gold-400 mb-4">
                                Peptide Compatibility Assessment
                            </h1>
                            <p className="text-luxury-cream/70 mb-8 text-lg max-w-lg mx-auto">
                                Discover which peptides are best suited for your health goals. This quick assessment takes about 3-5 minutes.
                            </p>

                            <div className="bg-luxury-charcoal rounded-sm p-6 mb-8 text-left border border-gold-400/20">
                                <h3 className="font-bold text-luxury-cream mb-4">What to Expect:</h3>
                                <ul className="space-y-3 text-luxury-cream/70">
                                    <li className="flex items-start gap-3">
                                        <User className="w-5 h-5 text-gold-400 mt-0.5" />
                                        <span>Basic information about yourself</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Target className="w-5 h-5 text-gold-400 mt-0.5" />
                                        <span>Your health and wellness goals</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Heart className="w-5 h-5 text-gold-400 mt-0.5" />
                                        <span>Relevant health information</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Gift className="w-5 h-5 text-gold-400 mt-0.5" />
                                        <span>Personalized peptide recommendations</span>
                                    </li>
                                </ul>
                            </div>

                            <label className="flex items-start gap-3 p-4 bg-luxury-black/50 rounded-sm border border-gold-400/10 cursor-pointer hover:border-gold-400/30 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={formData.consent_agreed}
                                    onChange={(e) => setFormData(prev => ({ ...prev, consent_agreed: e.target.checked }))}
                                    className="w-5 h-5 mt-0.5 accent-gold-400"
                                />
                                <span className="text-left text-sm text-luxury-cream/70">
                                    I consent to provide my information for personalized peptide recommendations. I understand this is for educational purposes and not medical advice.
                                </span>
                            </label>
                        </div>
                    )}

                    {/* Personal Info Step */}
                    {STEPS[currentStep].id === 'personal' && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold-400 mb-2 text-center">
                                Tell Us About Yourself
                            </h2>
                            <p className="text-luxury-cream/60 mb-8 text-center">
                                This helps us personalize your recommendations
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-luxury-cream mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                                        className="w-full px-4 py-3 bg-luxury-charcoal border border-gold-400/20 rounded-sm text-luxury-cream placeholder-luxury-cream/40 focus:outline-none focus:border-gold-400 transition-colors"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-luxury-cream mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        className="w-full px-4 py-3 bg-luxury-charcoal border border-gold-400/20 rounded-sm text-luxury-cream placeholder-luxury-cream/40 focus:outline-none focus:border-gold-400 transition-colors"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-luxury-cream mb-2">
                                        Age Range *
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {AGE_RANGES.map(range => (
                                            <button
                                                key={range}
                                                onClick={() => setFormData(prev => ({ ...prev, age_range: range }))}
                                                className={`px-4 py-3 rounded-sm border transition-all ${formData.age_range === range
                                                    ? 'bg-gold-400 text-black border-gold-400'
                                                    : 'bg-luxury-charcoal text-luxury-cream border-gold-400/20 hover:border-gold-400/50'
                                                    }`}
                                            >
                                                {range}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-luxury-cream mb-2">
                                        Location (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                        className="w-full px-4 py-3 bg-luxury-charcoal border border-gold-400/20 rounded-sm text-luxury-cream placeholder-luxury-cream/40 focus:outline-none focus:border-gold-400 transition-colors"
                                        placeholder="City, Country"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Goals Step */}
                    {STEPS[currentStep].id === 'goals' && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold-400 mb-2 text-center">
                                What Are Your Goals?
                            </h2>
                            <p className="text-luxury-cream/60 mb-8 text-center">
                                Select all that apply to you
                            </p>

                            <div className="grid grid-cols-2 gap-3">
                                {GOALS.map(goal => (
                                    <button
                                        key={goal.id}
                                        onClick={() => handleGoalToggle(goal.id)}
                                        className={`p-4 rounded-sm border transition-all text-left ${formData.goals.includes(goal.id)
                                            ? 'bg-gold-400/10 border-gold-400 text-gold-400'
                                            : 'bg-luxury-charcoal border-gold-400/20 text-luxury-cream hover:border-gold-400/50'
                                            }`}
                                    >
                                        <span className="text-2xl mb-2 block">{goal.emoji}</span>
                                        <span className="font-medium text-sm">{goal.label}</span>
                                    </button>
                                ))}
                            </div>

                            <p className="text-center text-luxury-cream/40 text-sm mt-6">
                                Selected: {formData.goals.length} goal{formData.goals.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    )}

                    {/* Medical History Step */}
                    {STEPS[currentStep].id === 'medical' && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold-400 mb-2 text-center">
                                Health Information
                            </h2>
                            <p className="text-luxury-cream/60 mb-8 text-center">
                                This helps ensure safe recommendations
                            </p>

                            <div className="grid grid-cols-2 gap-3">
                                {MEDICAL_CONDITIONS.map(condition => (
                                    <button
                                        key={condition.id}
                                        onClick={() => handleMedicalToggle(condition.id)}
                                        className={`p-4 rounded-sm border transition-all text-left ${formData.medical_history.includes(condition.id)
                                            ? condition.id === 'none'
                                                ? 'bg-green-500/10 border-green-500 text-green-400'
                                                : 'bg-gold-400/10 border-gold-400 text-gold-400'
                                            : 'bg-luxury-charcoal border-gold-400/20 text-luxury-cream hover:border-gold-400/50'
                                            }`}
                                    >
                                        <span className="text-2xl mb-2 block">{condition.emoji}</span>
                                        <span className="font-medium text-sm">{condition.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-luxury-charcoal/50 rounded-sm border border-gold-400/10">
                                <p className="text-luxury-cream/60 text-xs">
                                    ⚠️ If you have any medical conditions, please consult with a healthcare provider before starting any peptide regimen.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Experience Step */}
                    {STEPS[currentStep].id === 'experience' && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold-400 mb-2 text-center">
                                Your Peptide Experience
                            </h2>
                            <p className="text-luxury-cream/60 mb-8 text-center">
                                How familiar are you with peptides?
                            </p>

                            <div className="space-y-3">
                                {EXPERIENCE_LEVELS.map(level => (
                                    <button
                                        key={level.id}
                                        onClick={() => setFormData(prev => ({ ...prev, experience_level: level.id }))}
                                        className={`w-full p-4 rounded-sm border transition-all text-left ${formData.experience_level === level.id
                                            ? 'bg-gold-400/10 border-gold-400'
                                            : 'bg-luxury-charcoal border-gold-400/20 hover:border-gold-400/50'
                                            }`}
                                    >
                                        <span className={`font-bold ${formData.experience_level === level.id ? 'text-gold-400' : 'text-luxury-cream'}`}>
                                            {level.label}
                                        </span>
                                        <p className={`text-sm mt-1 ${formData.experience_level === level.id ? 'text-gold-400/70' : 'text-luxury-cream/60'}`}>
                                            {level.description}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Preferences Step */}
                    {STEPS[currentStep].id === 'preferences' && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold-400 mb-2 text-center">
                                Your Preferences
                            </h2>
                            <p className="text-luxury-cream/60 mb-8 text-center">
                                Help us match you with the right products
                            </p>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="font-bold text-luxury-cream mb-4">Budget Range *</h3>
                                    <div className="space-y-3">
                                        {BUDGET_RANGES.map(budget => (
                                            <button
                                                key={budget.id}
                                                onClick={() => setFormData(prev => ({
                                                    ...prev,
                                                    preferences: { ...prev.preferences, budget: budget.id }
                                                }))}
                                                className={`w-full p-4 rounded-sm border transition-all text-left ${formData.preferences.budget === budget.id
                                                    ? 'bg-gold-400/10 border-gold-400'
                                                    : 'bg-luxury-charcoal border-gold-400/20 hover:border-gold-400/50'
                                                    }`}
                                            >
                                                <span className={`font-bold ${formData.preferences.budget === budget.id ? 'text-gold-400' : 'text-luxury-cream'}`}>
                                                    {budget.label}
                                                </span>
                                                <p className={`text-sm mt-1 ${formData.preferences.budget === budget.id ? 'text-gold-400/70' : 'text-luxury-cream/60'}`}>
                                                    {budget.description}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-luxury-cream mb-4">Usage Frequency *</h3>
                                    <div className="space-y-3">
                                        {FREQUENCY_OPTIONS.map(freq => (
                                            <button
                                                key={freq.id}
                                                onClick={() => setFormData(prev => ({
                                                    ...prev,
                                                    preferences: { ...prev.preferences, frequency: freq.id }
                                                }))}
                                                className={`w-full p-4 rounded-sm border transition-all text-left ${formData.preferences.frequency === freq.id
                                                    ? 'bg-gold-400/10 border-gold-400'
                                                    : 'bg-luxury-charcoal border-gold-400/20 hover:border-gold-400/50'
                                                    }`}
                                            >
                                                <span className={`font-bold ${formData.preferences.frequency === freq.id ? 'text-gold-400' : 'text-luxury-cream'}`}>
                                                    {freq.label}
                                                </span>
                                                <p className={`text-sm mt-1 ${formData.preferences.frequency === freq.id ? 'text-gold-400/70' : 'text-luxury-cream/60'}`}>
                                                    {freq.description}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Results Step */}
                    {STEPS[currentStep].id === 'results' && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold-400 mb-2 text-center">
                                Review & Submit
                            </h2>
                            <p className="text-luxury-cream/60 mb-8 text-center">
                                Please review your responses
                            </p>

                            <div className="space-y-4">
                                {/* Summary Card */}
                                <div className="bg-luxury-charcoal rounded-sm p-6 border border-gold-400/20">
                                    <div className="grid gap-4">
                                        <div>
                                            <span className="text-luxury-cream/50 text-sm">Name</span>
                                            <p className="text-luxury-cream font-medium">{formData.full_name}</p>
                                        </div>
                                        <div>
                                            <span className="text-luxury-cream/50 text-sm">Email</span>
                                            <p className="text-luxury-cream font-medium">{formData.email}</p>
                                        </div>
                                        <div>
                                            <span className="text-luxury-cream/50 text-sm">Age Range</span>
                                            <p className="text-luxury-cream font-medium">{formData.age_range}</p>
                                        </div>
                                        <div>
                                            <span className="text-luxury-cream/50 text-sm">Goals</span>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {formData.goals.map(goalId => {
                                                    const goal = GOALS.find(g => g.id === goalId);
                                                    return goal ? (
                                                        <span key={goalId} className="px-2 py-1 bg-gold-400/10 text-gold-400 rounded text-sm">
                                                            {goal.emoji} {goal.label}
                                                        </span>
                                                    ) : null;
                                                })}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-luxury-cream/50 text-sm">Experience Level</span>
                                            <p className="text-luxury-cream font-medium">
                                                {EXPERIENCE_LEVELS.find(l => l.id === formData.experience_level)?.label}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-luxury-cream/50 text-sm">Budget</span>
                                            <p className="text-luxury-cream font-medium">
                                                {BUDGET_RANGES.find(b => b.id === formData.preferences.budget)?.label}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-sm text-red-400 text-sm">
                                        {error}
                                    </div>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full bg-gold-400 hover:bg-gold-300 text-black py-4 rounded-sm font-bold text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-5 h-5" />
                                            Submit Assessment
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="fixed bottom-0 left-0 right-0 bg-luxury-charcoal border-t border-gold-400/20 p-4">
                <div className="container mx-auto max-w-2xl flex gap-4">
                    {currentStep > 0 && (
                        <button
                            onClick={handleBack}
                            className="flex-1 py-3 px-6 bg-luxury-black border border-gold-400/30 text-luxury-cream rounded-sm font-medium hover:border-gold-400 transition-colors flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back
                        </button>
                    )}
                    {currentStep < STEPS.length - 1 && (
                        <button
                            onClick={handleNext}
                            disabled={!isStepValid()}
                            className="flex-1 py-3 px-6 bg-gold-400 text-black rounded-sm font-bold hover:bg-gold-300 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PeptideAssessment;
