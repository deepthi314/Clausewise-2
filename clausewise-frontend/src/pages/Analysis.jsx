import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileText, ShieldAlert, Scale, FileSearch, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

const Analysis = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('overview');
    const [data, setData] = useState({
        overview: null,
        clauses: null,
        risk: null,
        fairness: null
    });
    const [loading, setLoading] = useState({
        overview: true,
        clauses: false,
        risk: false,
        fairness: false
    });

    // Fetch data based on active tab
    useEffect(() => {
        const fetchData = async () => {
            if (data[activeTab]) return; // Already fetched

            setLoading(prev => ({ ...prev, [activeTab]: true }));
            try {
                let endpoint = '';
                switch (activeTab) {
                    case 'overview': endpoint = `/analysis/${id}/overview`; break;
                    case 'clauses': endpoint = `/analysis/${id}/extract`; break;
                    case 'risk': endpoint = `/analysis/${id}/risk`; break;
                    case 'fairness': endpoint = `/analysis/${id}/fairness`; break;
                    default: return;
                }

                const response = await api.get(endpoint);
                setData(prev => ({ ...prev, [activeTab]: response.data }));
            } catch (error) {
                console.error(`Failed to fetch ${activeTab}:`, error);
            } finally {
                setLoading(prev => ({ ...prev, [activeTab]: false }));
            }
        };

        fetchData();
    }, [activeTab, id]);

    const tabs = [
        { id: 'overview', label: 'Overview', icon: FileSearch },
        { id: 'clauses', label: 'Clauses', icon: FileText },
        { id: 'risk', label: 'Risk Analysis', icon: ShieldAlert },
        { id: 'fairness', label: 'Fairness Check', icon: Scale },
    ];

    const renderContent = () => {
        const isLoading = loading[activeTab];
        const currentData = data[activeTab];

        if (isLoading) {
            return (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
            );
        }

        if (!currentData) return <div className="text-center py-12 text-slate-500">Failed to load data.</div>;

        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Document Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                                    {currentData.summary || "No summary available."}
                                </p>
                            </CardContent>
                        </Card>
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Key Entities</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside text-slate-700 space-y-1">
                                        {currentData.entities?.map((entity, i) => (
                                            <li key={i}>{entity}</li>
                                        )) || <li>No entities found.</li>}
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Dates & Deadlines</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside text-slate-700 space-y-1">
                                        {currentData.dates?.map((date, i) => (
                                            <li key={i}>{date}</li>
                                        )) || <li>No dates found.</li>}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );

            case 'clauses':
                return (
                    <div className="space-y-4">
                        {currentData.clauses?.map((clause, i) => (
                            <Card key={i}>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg font-medium">{clause.title || `Clause ${i + 1}`}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-700">{clause.text}</p>
                                    {clause.simplified && (
                                        <div className="mt-3 p-3 bg-primary-50 rounded-md text-sm text-primary-800">
                                            <strong>Simplified:</strong> {clause.simplified}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )) || <p>No clauses extracted.</p>}
                    </div>
                );

            case 'risk':
                return (
                    <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card className="bg-red-50 border-red-100">
                                <CardContent className="pt-6 text-center">
                                    <div className="text-3xl font-bold text-red-600">{currentData.high_risk_count || 0}</div>
                                    <div className="text-sm text-red-800">High Risks</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-yellow-50 border-yellow-100">
                                <CardContent className="pt-6 text-center">
                                    <div className="text-3xl font-bold text-yellow-600">{currentData.medium_risk_count || 0}</div>
                                    <div className="text-sm text-yellow-800">Medium Risks</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-green-50 border-green-100">
                                <CardContent className="pt-6 text-center">
                                    <div className="text-3xl font-bold text-green-600">{currentData.low_risk_count || 0}</div>
                                    <div className="text-sm text-green-800">Low Risks</div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-4">
                            {currentData.risks?.map((risk, i) => (
                                <Card key={i} className="border-l-4 border-l-red-500">
                                    <CardContent className="pt-6">
                                        <div className="flex items-start gap-3">
                                            <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="font-semibold text-slate-900">{risk.category}</h4>
                                                <p className="text-slate-700 mt-1">{risk.description}</p>
                                                <p className="text-sm text-slate-500 mt-2">Severity: <span className="capitalize font-medium text-red-600">{risk.severity}</span></p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                );

            case 'fairness':
                return (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Fairness Score</CardTitle>
                                <CardDescription>Overall fairness assessment of the document.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4">
                                    <div className="h-24 w-24 rounded-full border-8 border-primary-100 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-primary-600">{currentData.score || 0}/100</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">
                                            {currentData.score >= 80 ? 'Fair & Balanced' : currentData.score >= 50 ? 'Moderate Bias' : 'Heavily Biased'}
                                        </h4>
                                        <p className="text-slate-500">{currentData.summary}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Detailed Breakdown</h3>
                            {currentData.breakdown?.map((item, i) => (
                                <Card key={i}>
                                    <CardContent className="pt-6">
                                        <div className="flex items-start gap-3">
                                            {item.is_fair ? (
                                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                            ) : (
                                                <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                                            )}
                                            <div>
                                                <p className="text-slate-900 font-medium">{item.point}</p>
                                                <p className="text-slate-600 text-sm mt-1">{item.explanation}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Document Analysis</h1>
                    <p className="text-slate-500">Detailed insights for your document.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Export Report</Button>
                </div>
            </div>

            <div className="flex border-b border-slate-200 overflow-x-auto">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                                isActive
                                    ? "border-primary-600 text-primary-600"
                                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <div className="min-h-[400px]">
                {renderContent()}
            </div>
        </div>
    );
};

export default Analysis;
