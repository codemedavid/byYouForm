import React, { useEffect } from 'react';
import { ArrowLeft, Scale } from 'lucide-react';

const TermsAndConditions: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <a href="/" className="inline-flex items-center text-gray-500 hover:text-gold-400 mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </a>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 text-gold-400 text-xs font-medium tracking-wider uppercase mb-4">
                                <Shield className="w-3 h-3" />
                                Legal
                            </div>
                            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                                Terms and Conditions
                            </h1>
                            <p className="text-gray-600 max-w-2xl">
                                Please read these terms and conditions carefully before using our website.
                                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8 text-gray-600 leading-relaxed">

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            1. Introduction
                        </h2>
                        <p>
                            Welcome to byYOUFORM. By accessing our website and purchasing our products, you agree to be bound by these Terms and Conditions.
                            These terms apply to all visitors, users, and others who access or use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            2. Research Purposes Only
                        </h2>
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 rounded-r-md">
                            <p className="text-red-800 text-sm font-medium">
                                IMPORTANT DISCLAIMER
                            </p>
                            <p className="text-red-700 text-sm mt-1">
                                All products sold on this website are strictly for laboratory and research purposes only. They are NOT strictly for human consumption.
                            </p>
                        </div>
                        <p>
                            By purchasing unmodified research peptides from byYOUFORM, you acknowledge that you understand the risks associated with handling these compounds.
                            You agree that you will research proper handling and safety procedures prior to use. These products are not intended to diagnose, treat, cure, or prevent any disease.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            3. Age Restriction
                        </h2>
                        <p>
                            You must be at least 18 years of age to access this website and purchase products. By using this website, you warrant that you are at least 18 years of age and viewing this content is legal in your local jurisdiction.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            4. Products and Pricing
                        </h2>
                        <p className="mb-4">
                            We reserve the right to modify or discontinue any product at any time without notice. Prices for our products are subject to change without notice.
                            We shall not be liable to you or to any third-party for any modification, price change, suspension, or discontinuance of the Service.
                        </p>
                        <p>
                            We have made every effort to display as accurately as possible the colors and images of our products. We cannot guarantee that your computer monitor's display of any color will be accurate.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            5. Shipping and Delivery
                        </h2>
                        <p>
                            Shipping times are estimates and not guarantees. We are not responsible for delays caused by shipping carriers or customs clearance.
                            Once a package has been handed over to the courier, risk of loss passes to the buyer. Please refer to our Shipping Policy for more details.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            6. Return and Refund Policy
                        </h2>
                        <p>
                            Due to the nature of our products (research chemicals), we generally do not accept returns for quality control and safety reasons.
                            If you receive a damaged or incorrect item, please contact our support team immediately for assistance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            7. Limitation of Liability
                        </h2>
                        <p>
                            In no case shall byYOUFORM, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            8. Privacy Policy
                        </h2>
                        <p>
                            Your submission of personal information through the store is governed by our Privacy Policy. We implement industry-standard security measures to protect your personal data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            9. Governing Law
                        </h2>
                        <p>
                            These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is registered.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            10. Changes to Terms
                        </h2>
                        <p>
                            You can review the most current version of the Terms and Conditions at any time on this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms and Conditions by posting updates and changes to our website.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-gray-100 mt-12 flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <Scale className="w-4 h-4" />
                            <span>© {new Date().getFullYear()} byYOUFORM</span>
                        </div>
                        <a href="mailto:support@byyouform.com" className="hover:text-gold-400 transition-colors">
                            Contact Support
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
