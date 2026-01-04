import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { AssessmentResponse, RecommendationRule, Product } from '../types';

// Hook for submitting assessment (public-facing)
export const useAssessment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitAssessment = async (
        assessmentData: Omit<AssessmentResponse, 'id' | 'created_at' | 'status' | 'recommendation_generated'>
    ): Promise<AssessmentResponse | null> => {
        setLoading(true);
        setError(null);

        try {
            // Fetch recommendation rules
            const { data: rules } = await supabase
                .from('recommendation_rules')
                .select('*')
                .eq('is_active', true)
                .order('priority', { ascending: false });

            // Generate recommendations based on rules and user data
            const recommendations = generateRecommendations(assessmentData, rules || []);

            const { data, error: insertError } = await supabase
                .from('assessment_responses')
                .insert([{
                    ...assessmentData,
                    recommendation_generated: recommendations,
                    status: 'new'
                }])
                .select()
                .single();

            if (insertError) throw insertError;
            return data;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to submit assessment';
            setError(message);
            console.error('Assessment submission error:', err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { submitAssessment, loading, error };
};

// Generate recommendations based on rules
const generateRecommendations = (
    assessmentData: Omit<AssessmentResponse, 'id' | 'created_at' | 'status' | 'recommendation_generated'>,
    rules: RecommendationRule[]
): { products: string[]; notes: string[] } => {
    const matchedProducts: Set<string> = new Set();
    const notes: string[] = [];

    for (const rule of rules) {
        // Check if rule matches user's goals
        const goalMatch = !rule.target_goal || assessmentData.goals.includes(rule.target_goal);

        // Check if rule matches user's experience level
        const experienceMatch = !rule.target_experience ||
            assessmentData.experience_level === rule.target_experience;

        if (goalMatch && experienceMatch) {
            if (rule.primary_product_id) {
                matchedProducts.add(rule.primary_product_id);
            }
            if (rule.secondary_product_ids) {
                rule.secondary_product_ids.forEach(id => matchedProducts.add(id));
            }
            if (rule.educational_note) {
                notes.push(rule.educational_note);
            }
        }
    }

    return {
        products: Array.from(matchedProducts),
        notes: [...new Set(notes)] // Remove duplicate notes
    };
};

// Hook for admin management
export const useAssessmentAdmin = () => {
    const [responses, setResponses] = useState<AssessmentResponse[]>([]);
    const [rules, setRules] = useState<RecommendationRule[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchResponses = async () => {
        try {
            const { data, error: fetchError } = await supabase
                .from('assessment_responses')
                .select('*')
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;
            setResponses(data || []);
        } catch (err) {
            console.error('Error fetching assessment responses:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch responses');
        }
    };

    const fetchRules = async () => {
        try {
            const { data, error: fetchError } = await supabase
                .from('recommendation_rules')
                .select('*')
                .order('priority', { ascending: false });

            if (fetchError) throw fetchError;
            setRules(data || []);
        } catch (err) {
            console.error('Error fetching recommendation rules:', err);
        }
    };

    const fetchProducts = async () => {
        try {
            const { data, error: fetchError } = await supabase
                .from('products')
                .select('id, name')
                .eq('available', true)
                .order('name');

            if (fetchError) throw fetchError;
            setProducts(data || []);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    const fetchAll = async () => {
        setLoading(true);
        await Promise.all([fetchResponses(), fetchRules(), fetchProducts()]);
        setLoading(false);
    };

    useEffect(() => {
        fetchAll();
    }, []);

    // Response operations
    const updateResponseStatus = async (id: string, status: AssessmentResponse['status']) => {
        const { error } = await supabase
            .from('assessment_responses')
            .update({ status })
            .eq('id', id);

        if (error) throw error;
        await fetchResponses();
    };

    const deleteResponse = async (id: string) => {
        const { error } = await supabase
            .from('assessment_responses')
            .delete()
            .eq('id', id);

        if (error) throw error;
        await fetchResponses();
    };

    // Rule operations
    const addRule = async (rule: Omit<RecommendationRule, 'id' | 'created_at'>) => {
        const { error } = await supabase
            .from('recommendation_rules')
            .insert([rule]);

        if (error) throw error;
        await fetchRules();
    };

    const updateRule = async (id: string, updates: Partial<RecommendationRule>) => {
        const { error } = await supabase
            .from('recommendation_rules')
            .update(updates)
            .eq('id', id);

        if (error) throw error;
        await fetchRules();
    };

    const deleteRule = async (id: string) => {
        const { error } = await supabase
            .from('recommendation_rules')
            .delete()
            .eq('id', id);

        if (error) throw error;
        await fetchRules();
    };

    const toggleRuleActive = async (id: string, is_active: boolean) => {
        await updateRule(id, { is_active });
    };

    return {
        responses,
        rules,
        products,
        loading,
        error,
        refetch: fetchAll,
        updateResponseStatus,
        deleteResponse,
        addRule,
        updateRule,
        deleteRule,
        toggleRuleActive
    };
};
