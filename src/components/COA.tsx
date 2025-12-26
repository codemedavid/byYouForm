import React, { useState, useEffect } from 'react';
import { Shield, Award, CheckCircle, X, ExternalLink, Download, Dna, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCOAPageSetting } from '../hooks/useCOAPageSetting';

interface COAReport {
  id: string;
  product_name: string;
  batch: string;
  test_date: string;
  purity_percentage: number;
  quantity: string;
  task_number: string;
  verification_key: string;
  image_url: string;
  featured: boolean;
  laboratory: string;
}

const COA: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [coaReports, setCOAReports] = useState<COAReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCOAReports();
  }, []);

  const fetchCOAReports = async () => {
    try {
      const { data, error } = await supabase
        .from('coa_reports')
        .select('*')
        .order('test_date', { ascending: false });

      if (error) throw error;
      setCOAReports(data || []);
    } catch (error) {
      console.error('Error fetching COA reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const { coaPageEnabled, loading: settingLoading } = useCOAPageSetting();

  if (settingLoading || loading) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!coaPageEnabled) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <div className="text-center p-8">
          <Shield className="w-16 h-16 text-gold-400/30 mx-auto mb-4" />
          <h1 className="text-2xl font-playfair font-bold text-gold-400 mb-2">Lab Reports Unavailable</h1>
          <p className="text-luxury-cream/60 mb-6">The COA page is currently disabled.</p>
          <a href="/" className="px-6 py-3 bg-gold-400 text-black rounded-sm font-semibold hover:bg-gold-300 transition-colors">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-luxury-charcoal py-12 md:py-20 border-b border-gold-400/20">
        {/* Background Effects */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold-400/3 rounded-full blur-3xl"></div>

        {/* Back Button */}
        <a
          href="/"
          className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-luxury-black/80 backdrop-blur-sm px-4 py-2 rounded-sm border border-gold-400/20 text-luxury-cream/70 hover:text-gold-400 hover:border-gold-400 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium tracking-wide">Back</span>
        </a>

        <div className="relative container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gold-400/10 backdrop-blur-md px-4 py-2 rounded-full border border-gold-400/30 mb-6">
              <Shield className="w-4 h-4 text-gold-400" />
              <span className="text-xs font-medium text-gold-400 tracking-wider uppercase">Lab Verified</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4 text-luxury-cream">
              <span className="text-gold-400">Lab Reports</span>
            </h1>

            <p className="text-base md:text-lg text-luxury-cream/60 mb-8">
              Tested by <strong className="text-gold-400">Janoshik + Chromate</strong>
            </p>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-sm">
              <div className="flex items-center gap-2 bg-luxury-black/50 backdrop-blur-sm px-4 py-2.5 rounded-sm border border-gold-400/20">
                <CheckCircle className="w-4 h-4 text-gold-400" />
                <span className="font-medium text-luxury-cream/80">99%+ Purity</span>
              </div>
              <div className="flex items-center gap-2 bg-luxury-black/50 backdrop-blur-sm px-4 py-2.5 rounded-sm border border-gold-400/20">
                <Award className="w-4 h-4 text-gold-400" />
                <span className="font-medium text-luxury-cream/80">Certified</span>
              </div>
              <div className="flex items-center gap-2 bg-luxury-black/50 backdrop-blur-sm px-4 py-2.5 rounded-sm border border-gold-400/20">
                <Dna className="w-4 h-4 text-gold-400" />
                <span className="font-medium text-luxury-cream/80">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COA Reports Grid */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {coaReports.length === 0 ? (
            <div className="col-span-2 text-center py-20">
              <Shield className="w-20 h-20 text-gold-400/20 mx-auto mb-4" />
              <p className="text-xl text-luxury-cream/50">No lab reports available yet.</p>
            </div>
          ) : (
            coaReports.map((report) => (
              <div
                key={report.id}
                className="bg-luxury-charcoal rounded-sm overflow-hidden border border-gold-400/10 hover:border-gold-400/30 transition-all duration-300 hover:shadow-gold"
              >
                {/* Report Image */}
                <div
                  className="relative cursor-pointer group"
                  onClick={() => setSelectedImage(report.image_url)}
                >
                  <img
                    src={report.image_url}
                    alt={`${report.product_name} Certificate of Analysis`}
                    className="w-full h-56 md:h-72 object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23111111" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23D4AF37" font-size="16" font-family="Arial"%3ECOA Image Coming Soon%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute inset-0 bg-gold-400/0 group-hover:bg-gold-400/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-luxury-black/90 backdrop-blur-sm px-4 py-2 rounded-sm border border-gold-400/30">
                      <p className="text-sm font-medium text-gold-400 flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        View full report
                      </p>
                    </div>
                  </div>
                </div>

                {/* Report Details */}
                <div className="p-5 md:p-6">
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <h3 className="text-lg md:text-xl font-playfair font-bold text-gold-400">{report.product_name}</h3>
                    {report.featured && (
                      <span className="bg-gold-400/10 text-gold-400 px-3 py-1 rounded-sm text-xs font-medium border border-gold-400/30 whitespace-nowrap">
                        ✓ VERIFIED
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between py-2 border-b border-gold-400/10">
                      <span className="text-sm text-luxury-cream/50 font-medium">Purity:</span>
                      <span className="text-base font-bold text-gold-400">{report.purity_percentage}%</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gold-400/10">
                      <span className="text-sm text-luxury-cream/50 font-medium">Quantity:</span>
                      <span className="text-base font-semibold text-luxury-cream">{report.quantity}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gold-400/10">
                      <span className="text-sm text-luxury-cream/50 font-medium">Test Date:</span>
                      <span className="text-sm text-luxury-cream/80">{new Date(report.test_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gold-400/10">
                      <span className="text-sm text-luxury-cream/50 font-medium">Task:</span>
                      <span className="text-sm text-luxury-cream/80 font-mono">{report.task_number}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {(() => {
                      const isJanoshik = !report.laboratory || report.laboratory.toLowerCase().includes('janoshik');
                      const verificationUrl = isJanoshik
                        ? `https://www.janoshik.com/verify/?key=${report.verification_key}`
                        : 'https://chromate.org';

                      return (
                        <a
                          href={verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 bg-gold-400 text-black px-4 py-3 rounded-sm text-sm font-semibold transition-all duration-300 hover:bg-gold-300 shadow-gold"
                        >
                          <Shield className="w-4 h-4" />
                          {isJanoshik ? 'Verify on Janoshik' : 'Verify on Chromate'}
                        </a>
                      );
                    })()}

                    <button
                      onClick={() => setSelectedImage(report.image_url)}
                      className="w-full flex items-center justify-center gap-2 bg-transparent text-gold-400 border border-gold-400 hover:bg-gold-400/10 px-4 py-3 rounded-sm text-sm font-medium transition-all duration-300"
                    >
                      <Download className="w-4 h-4" />
                      View Full Report
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Info Section */}
        <div className="mt-12 md:mt-16 max-w-4xl mx-auto">
          <div className="bg-luxury-charcoal rounded-sm p-6 md:p-8 border border-gold-400/20">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gold-400/10 rounded-full flex items-center justify-center border border-gold-400/30">
                  <Shield className="w-6 h-6 text-gold-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-playfair font-bold text-gold-400 mb-3">Independent Laboratory Verification</h3>
                <p className="text-sm md:text-base text-luxury-cream/60 leading-relaxed mb-4">
                  We partner with top-tier third-party laboratories like <strong className="text-luxury-cream">Janoshik Analytical</strong> and <strong className="text-luxury-cream">Chromate</strong> to ensure the highest quality standards.
                  Each batch is rigorously tested for purity and concentration using HPLC and Mass Spectrometry.
                </p>
                <div className="flex gap-6">
                  <a
                    href="https://www.janoshik.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 font-medium"
                  >
                    <span>Janoshik</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://chromate.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 font-medium"
                  >
                    <span>Chromate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 bg-luxury-charcoal hover:bg-gold-400/10 text-luxury-cream rounded-sm p-2.5 transition-all border border-gold-400/20"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImage}
              alt="Certificate of Analysis"
              className="w-full h-auto rounded-sm shadow-2xl border border-gold-400/20"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default COA;
