import React, { useState } from 'react';
import {
    ArrowLeft,
    ClipboardList,
    Settings,
    Eye,
    Trash2,
    Plus,
    Edit2,
    Save,
    X,
    RefreshCw,
    Filter,
    Download,
    CheckCircle,
    Clock,
    Phone,
    ChevronDown,
    ChevronUp,
    Target,
    User
} from 'lucide-react';
import { useAssessmentAdmin } from '../hooks/useAssessment';
import type { AssessmentResponse, RecommendationRule } from '../types';

interface AssessmentManagerProps {
    onBack?: () => void;
}

const AssessmentManager: React.FC<AssessmentManagerProps> = ({ onBack }) => {
    const {
        responses,
        rules,
        products,
        loading,
        refetch,
        updateResponseStatus,
        deleteResponse,
        addRule,
        updateRule,
        deleteRule,
        toggleRuleActive
    } = useAssessmentAdmin();

    const [activeTab, setActiveTab] = useState<'responses' | 'rules'>('responses');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedResponse, setSelectedResponse] = useState<AssessmentResponse | null>(null);
    const [isAddingRule, setIsAddingRule] = useState(false);
    const [editingRule, setEditingRule] = useState<RecommendationRule | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [ruleForm, setRuleForm] = useState({
        rule_name: '',
        target_goal: '',
        target_experience: '',
        primary_product_id: '',
        secondary_product_ids: [] as string[],
        educational_note: '',
        priority: 0,
        is_active: true
    });

    const filteredResponses = statusFilter === 'all'
        ? responses
        : responses.filter(r => r.status === statusFilter);

    const handleStatusChange = async (id: string, status: AssessmentResponse['status']) => {
        try {
            await updateResponseStatus(id, status);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update status');
        }
    };

    const handleDeleteResponse = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this assessment response?')) return;
        try {
            await deleteResponse(id);
            setSelectedResponse(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete response');
        }
    };

    const resetRuleForm = () => {
        setRuleForm({
            rule_name: '',
            target_goal: '',
            target_experience: '',
            primary_product_id: '',
            secondary_product_ids: [],
            educational_note: '',
            priority: 0,
            is_active: true
        });
        setIsAddingRule(false);
        setEditingRule(null);
    };

    const handleEditRule = (rule: RecommendationRule) => {
        setRuleForm({
            rule_name: rule.rule_name,
            target_goal: rule.target_goal || '',
            target_experience: rule.target_experience || '',
            primary_product_id: rule.primary_product_id || '',
            secondary_product_ids: rule.secondary_product_ids || [],
            educational_note: rule.educational_note || '',
            priority: rule.priority,
            is_active: rule.is_active
        });
        setEditingRule(rule);
        setIsAddingRule(true);
    };

    const handleSaveRule = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ruleForm.rule_name.trim()) {
            setError('Rule name is required');
            return;
        }

        try {
            const ruleData = {
                rule_name: ruleForm.rule_name,
                target_goal: ruleForm.target_goal || null,
                target_experience: ruleForm.target_experience || null,
                primary_product_id: ruleForm.primary_product_id || null,
                secondary_product_ids: ruleForm.secondary_product_ids.length > 0 ? ruleForm.secondary_product_ids : null,
                educational_note: ruleForm.educational_note || null,
                priority: ruleForm.priority,
                is_active: ruleForm.is_active
            };

            if (editingRule) {
                await updateRule(editingRule.id, ruleData);
            } else {
                await addRule(ruleData as Omit<RecommendationRule, 'id' | 'created_at'>);
            }
            resetRuleForm();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save rule');
        }
    };

    const handleDeleteRule = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this rule?')) return;
        try {
            await deleteRule(id);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete rule');
        }
    };

    const exportToCSV = () => {
        const headers = ['Name', 'Email', 'Age Range', 'Goals', 'Experience', 'Status', 'Date'];
        const rows = responses.map(r => [
            r.full_name,
            r.email,
            r.age_range,
            r.goals.join('; '),
            r.experience_level,
            r.status,
            new Date(r.created_at).toLocaleDateString()
        ]);

        const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `assessment-responses-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const getStatusBadge = (status: AssessmentResponse['status']) => {
        switch (status) {
            case 'new':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        <Clock className="w-3 h-3" /> New
                    </span>
                );
            case 'reviewed':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        <Eye className="w-3 h-3" /> Reviewed
                    </span>
                );
            case 'contacted':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <CheckCircle className="w-3 h-3" /> Contacted
                    </span>
                );
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full" />
            </div>
        );
    }

    return (
        <div className="space-y-6 p-4 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-2"
                            title="Go Back"
                        >
                            <ArrowLeft className="w-6 h-6 text-gray-600" />
                        </button>
                    )}
                    <ClipboardList className="w-6 h-6 text-gray-900" />
                    <h2 className="text-xl font-bold text-gray-900">Assessment Management</h2>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={refetch}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Refresh"
                    >
                        <RefreshCw className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center">
                    <span>{error}</span>
                    <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('responses')}
                    className={`px-4 py-3 font-medium transition-colors relative ${activeTab === 'responses'
                            ? 'text-gray-900'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Responses
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                            {responses.length}
                        </span>
                    </div>
                    {activeTab === 'responses' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('rules')}
                    className={`px-4 py-3 font-medium transition-colors relative ${activeTab === 'rules'
                            ? 'text-gray-900'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Recommendation Rules
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                            {rules.length}
                        </span>
                    </div>
                    {activeTab === 'rules' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                    )}
                </button>
            </div>

            {/* Responses Tab */}
            {activeTab === 'responses' && (
                <div className="space-y-4">
                    {/* Filters & Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                            >
                                <option value="all">All Statuses</option>
                                <option value="new">New</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="contacted">Contacted</option>
                            </select>
                        </div>
                        <button
                            onClick={exportToCSV}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                        >
                            <Download className="w-4 h-4" />
                            Export CSV
                        </button>
                    </div>

                    {/* Responses Table */}
                    {filteredResponses.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-xl border border-gray-200 border-dashed">
                            <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                            <p className="text-gray-500 text-lg">No assessment responses found.</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Goals</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredResponses.map((response) => (
                                            <tr key={response.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-3">
                                                    <span className="font-medium text-gray-900">{response.full_name}</span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-600 text-sm">{response.email}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-wrap gap-1">
                                                        {response.goals.slice(0, 2).map(goal => (
                                                            <span key={goal} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                                                                {goal}
                                                            </span>
                                                        ))}
                                                        {response.goals.length > 2 && (
                                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                                                +{response.goals.length - 2}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <select
                                                        value={response.status}
                                                        onChange={(e) => handleStatusChange(response.id, e.target.value as AssessmentResponse['status'])}
                                                        className="text-xs border border-gray-200 rounded px-2 py-1 focus:ring-2 focus:ring-gray-400"
                                                    >
                                                        <option value="new">New</option>
                                                        <option value="reviewed">Reviewed</option>
                                                        <option value="contacted">Contacted</option>
                                                    </select>
                                                </td>
                                                <td className="px-4 py-3 text-gray-500 text-sm">
                                                    {new Date(response.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => setSelectedResponse(response)}
                                                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                            title="View Details"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteResponse(response.id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Rules Tab */}
            {activeTab === 'rules' && (
                <div className="space-y-4">
                    {/* Add Rule Button */}
                    {!isAddingRule && (
                        <button
                            onClick={() => setIsAddingRule(true)}
                            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Rule
                        </button>
                    )}

                    {/* Add/Edit Rule Form */}
                    {isAddingRule && (
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-4">
                                {editingRule ? 'Edit Rule' : 'Add New Rule'}
                            </h3>
                            <form onSubmit={handleSaveRule} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Rule Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={ruleForm.rule_name}
                                            onChange={(e) => setRuleForm(prev => ({ ...prev, rule_name: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                                            placeholder="e.g., Weight Loss Beginner"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Priority
                                        </label>
                                        <input
                                            type="number"
                                            value={ruleForm.priority}
                                            onChange={(e) => setRuleForm(prev => ({ ...prev, priority: parseInt(e.target.value) || 0 }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                                            min={0}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Target Goal
                                        </label>
                                        <select
                                            value={ruleForm.target_goal}
                                            onChange={(e) => setRuleForm(prev => ({ ...prev, target_goal: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                                        >
                                            <option value="">Any Goal</option>
                                            <option value="weight_loss">Weight Loss</option>
                                            <option value="muscle_building">Muscle Building</option>
                                            <option value="anti_aging">Anti-Aging</option>
                                            <option value="energy">Increased Energy</option>
                                            <option value="sleep">Better Sleep</option>
                                            <option value="recovery">Faster Recovery</option>
                                            <option value="skin_health">Skin Health</option>
                                            <option value="cognitive">Mental Clarity</option>
                                            <option value="immune">Immune Support</option>
                                            <option value="hormone">Hormone Balance</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Target Experience
                                        </label>
                                        <select
                                            value={ruleForm.target_experience}
                                            onChange={(e) => setRuleForm(prev => ({ ...prev, target_experience: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                                        >
                                            <option value="">Any Experience</option>
                                            <option value="none">Complete Beginner</option>
                                            <option value="research">Researching</option>
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="advanced">Advanced</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Primary Product
                                    </label>
                                    <select
                                        value={ruleForm.primary_product_id}
                                        onChange={(e) => setRuleForm(prev => ({ ...prev, primary_product_id: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                                    >
                                        <option value="">Select a product</option>
                                        {products.map(product => (
                                            <option key={product.id} value={product.id}>{product.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Educational Note
                                    </label>
                                    <textarea
                                        value={ruleForm.educational_note}
                                        onChange={(e) => setRuleForm(prev => ({ ...prev, educational_note: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                                        rows={3}
                                        placeholder="Information to display when this rule matches..."
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={ruleForm.is_active}
                                        onChange={(e) => setRuleForm(prev => ({ ...prev, is_active: e.target.checked }))}
                                        className="w-4 h-4 rounded border-gray-300"
                                    />
                                    <label htmlFor="is_active" className="text-sm text-gray-700">
                                        Active
                                    </label>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        {editingRule ? 'Update Rule' : 'Save Rule'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetRuleForm}
                                        className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Rules List */}
                    {rules.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-xl border border-gray-200 border-dashed">
                            <Settings className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                            <p className="text-gray-500 text-lg">No recommendation rules configured.</p>
                            <p className="text-sm text-gray-400 mt-2">
                                Add rules to automatically generate personalized recommendations.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {rules.map((rule) => (
                                <div
                                    key={rule.id}
                                    className={`bg-white rounded-xl border p-4 transition-all ${rule.is_active ? 'border-gray-200' : 'border-gray-200 opacity-60'
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h4 className="font-semibold text-gray-900">{rule.rule_name}</h4>
                                                {!rule.is_active && (
                                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">
                                                        Inactive
                                                    </span>
                                                )}
                                                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                                                    Priority: {rule.priority}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                                {rule.target_goal && (
                                                    <span className="px-2 py-1 bg-gray-100 rounded">
                                                        Goal: {rule.target_goal}
                                                    </span>
                                                )}
                                                {rule.target_experience && (
                                                    <span className="px-2 py-1 bg-gray-100 rounded">
                                                        Experience: {rule.target_experience}
                                                    </span>
                                                )}
                                            </div>
                                            {rule.educational_note && (
                                                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                                    {rule.educational_note}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => toggleRuleActive(rule.id, !rule.is_active)}
                                                className={`p-2 rounded-lg transition-colors ${rule.is_active
                                                        ? 'text-green-600 hover:bg-green-50'
                                                        : 'text-gray-400 hover:bg-gray-100'
                                                    }`}
                                                title={rule.is_active ? 'Deactivate' : 'Activate'}
                                            >
                                                {rule.is_active ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => handleEditRule(rule)}
                                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteRule(rule.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Response Detail Modal */}
            {selectedResponse && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Assessment Details</h3>
                            <button
                                onClick={() => setSelectedResponse(null)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Status Badge */}
                            <div className="flex items-center justify-between">
                                {getStatusBadge(selectedResponse.status)}
                                <span className="text-sm text-gray-500">
                                    {new Date(selectedResponse.created_at).toLocaleString()}
                                </span>
                            </div>

                            {/* Personal Info */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Name</span>
                                        <p className="font-medium text-gray-900">{selectedResponse.full_name}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Email</span>
                                        <p className="font-medium text-gray-900">{selectedResponse.email}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Age Range</span>
                                        <p className="font-medium text-gray-900">{selectedResponse.age_range}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Location</span>
                                        <p className="font-medium text-gray-900">{selectedResponse.location || '—'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Goals */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Goals</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedResponse.goals.map(goal => (
                                        <span key={goal} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                                            {goal}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Medical History */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Medical History</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedResponse.medical_history.map(condition => (
                                        <span key={condition} className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm">
                                            {condition}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Experience & Preferences */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Experience Level</h4>
                                    <p className="text-sm text-gray-600">{selectedResponse.experience_level}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Preferences</h4>
                                    <p className="text-sm text-gray-600">
                                        Budget: {selectedResponse.preferences?.budget || '—'}
                                        <br />
                                        Frequency: {selectedResponse.preferences?.frequency || '—'}
                                    </p>
                                </div>
                            </div>

                            {/* Recommendations */}
                            {selectedResponse.recommendation_generated && (
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Generated Recommendations</h4>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <pre className="text-xs text-gray-600 overflow-x-auto">
                                            {JSON.stringify(selectedResponse.recommendation_generated, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                                <select
                                    value={selectedResponse.status}
                                    onChange={(e) => {
                                        handleStatusChange(selectedResponse.id, e.target.value as AssessmentResponse['status']);
                                        setSelectedResponse({ ...selectedResponse, status: e.target.value as AssessmentResponse['status'] });
                                    }}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400"
                                >
                                    <option value="new">New</option>
                                    <option value="reviewed">Reviewed</option>
                                    <option value="contacted">Contacted</option>
                                </select>
                                <a
                                    href={`mailto:${selectedResponse.email}`}
                                    className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                                >
                                    <Phone className="w-4 h-4" />
                                    Contact
                                </a>
                                <button
                                    onClick={() => handleDeleteResponse(selectedResponse.id)}
                                    className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-medium text-blue-900 mb-2">💡 How It Works</h4>
                <p className="text-sm text-blue-700">
                    <strong>Responses:</strong> View and manage user assessment submissions. Update status as you process each lead.
                    <br />
                    <strong>Rules:</strong> Configure recommendation rules that match user goals and experience to specific products.
                </p>
            </div>
        </div>
    );
};

export default AssessmentManager;
