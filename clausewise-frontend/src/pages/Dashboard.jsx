import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import FileUpload from '../components/FileUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { FileText, Clock, ChevronRight, Search } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchDocuments = async () => {
    try {
      const response = await api.get('/files/history');
      setDocuments(response.data.documents);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter(doc =>
    doc.filename?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-2">Manage and analyze your legal documents.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Upload Section */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>
              Upload a new contract or legal document for analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload onUploadSuccess={fetchDocuments} />
          </CardContent>
        </Card>

        {/* Quick Stats or Info */}
        <Card className="bg-primary-900 text-white border-none">
          <CardHeader>
            <CardTitle className="text-white">ClauseWise AI</CardTitle>
            <CardDescription className="text-primary-100">
              Your intelligent legal assistant.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-primary-100 mb-4">
              Our AI analyzes your documents for risks, fairness, and key clauses in seconds.
            </p>
            <div className="text-3xl font-bold">{documents.length}</div>
            <div className="text-sm text-primary-200">Documents Analyzed</div>
          </CardContent>
        </Card>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Recent Documents</h2>
          <div className="w-64">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search documents..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading documents...</div>
        ) : filteredDocuments.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No documents found</h3>
              <p className="text-slate-500 mt-1">Upload your first document to get started.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDocuments.map((doc) => (
              <Link key={doc.id} to={`/analysis/${doc.id}`}>
                <Card className="hover:border-primary-500 transition-colors cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary-600" />
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                        {doc.type || 'Contract'}
                      </span>
                    </div>
                    <CardTitle className="mt-4 text-base line-clamp-1" title={doc.filename}>
                      {doc.filename}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {new Date(doc.upload_date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-primary-600 font-medium">
                      View Analysis <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;