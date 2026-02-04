/**
 * Admin Guide Page - PROTECTED
 * Comprehensive training guide for VoteLive administrators
 * Requires admin authentication
 */

import * as React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { 
  ArrowLeft, Shield, Database, AlertTriangle, BarChart3, 
  CheckCircle, Clock, Eye, Lock, Terminal, TrendingUp,
  Users, Globe, Activity, FileText, Settings
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Guide | HaitiVote',
  description: 'Comprehensive administrator training guide for VoteLive platform',
  openGraph: {
    title: 'Admin Guide | HaitiVote',
    description: 'Training manual for platform administrators',
  },
};

export default async function AdminGuidePage() {
  // Check authentication - only admin can access
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-700 hover:text-[#006CFF] transition-colors font-semibold"
            >
              <ArrowLeft className="h-5 w-5" />
              Retounen
            </Link>
            
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-[#006CFF]" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#006CFF] to-[#7F00FF] bg-clip-text text-transparent">
                Admin Guide
              </h1>
            </div>
            
            <Link 
              href="/admin" 
              className="px-4 py-2 bg-gradient-to-r from-[#006CFF] to-[#7F00FF] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-5xl font-bold">
            Administrator Training Guide 🔧
          </h2>
          <p className="text-2xl text-gray-300">
            Complete manual for VoteLive platform management
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <Database className="h-5 w-5" />
              <span>Database Access</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <AlertTriangle className="h-5 w-5" />
              <span>Fraud Detection</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <BarChart3 className="h-5 w-5" />
              <span>Reports</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Admin Role Overview */}
          <section className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-600" />
              Admin Role Overview
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                <div className="flex items-start gap-3">
                  <Activity className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Platform Monitoring</h4>
                    <p className="text-gray-700">System health & performance tracking</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-red-50 rounded-xl border-2 border-red-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Fraud Detection</h4>
                    <p className="text-gray-700">Identifying suspicious activity</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                <div className="flex items-start gap-3">
                  <Database className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Data Management</h4>
                    <p className="text-gray-700">Candidate info, vote integrity</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                <div className="flex items-start gap-3">
                  <BarChart3 className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Reporting</h4>
                    <p className="text-gray-700">Generate insights for stakeholders</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Access & Login */}
          <section className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lock className="h-8 w-8 text-green-600" />
              Access & Login
            </h3>
            
            <div className="space-y-6">
              {/* Supabase */}
              <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Database className="h-6 w-6 text-green-600" />
                  Supabase Dashboard
                </h4>
                <p className="text-gray-700 mb-4">
                  <strong>URL:</strong> <a href="https://supabase.com/dashboard" target="_blank" rel="noopener" className="text-blue-600 hover:underline">https://supabase.com/dashboard</a>
                </p>
                <div className="space-y-2 text-gray-700">
                  <p>✅ View all database tables</p>
                  <p>✅ Run SQL queries</p>
                  <p>✅ Monitor realtime activity</p>
                  <p>✅ Review logs</p>
                </div>
              </div>

              {/* Vercel */}
              <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  Vercel Dashboard
                </h4>
                <p className="text-gray-700 mb-4">
                  <strong>URL:</strong> <a href="https://vercel.com/dashboard" target="_blank" rel="noopener" className="text-blue-600 hover:underline">https://vercel.com/dashboard</a>
                </p>
                <div className="space-y-2 text-gray-700">
                  <p>✅ Monitor deployment status</p>
                  <p>✅ View analytics</p>
                  <p>✅ Check error logs</p>
                  <p>✅ Manage environment variables</p>
                </div>
              </div>

              {/* Admin Panel */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Settings className="h-6 w-6 text-purple-600" />
                  Admin Panel (In-App)
                </h4>
                <p className="text-gray-700 mb-4">
                  <strong>URL:</strong> <a href="https://www.haitivote.org/admin" className="text-blue-600 hover:underline">https://www.haitivote.org/admin</a>
                </p>
                <div className="space-y-2 text-gray-700">
                  <p>✅ Real-time vote monitoring</p>
                  <p>✅ Fraud detection alerts</p>
                  <p>✅ Candidate management</p>
                  <p>✅ Export data</p>
                </div>
              </div>
            </div>
          </section>

          {/* Daily Monitoring */}
          <section className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-600" />
              Daily Monitoring Tasks
            </h3>
            
            <div className="space-y-8">
              {/* Morning Checklist */}
              <div className="border-l-4 border-yellow-500 pl-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  ☀️ Morning Checklist (15 minutes)
                </h4>
                
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h5 className="font-bold text-lg mb-2">1. System Health Check</h5>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`-- Run in Supabase SQL Editor

-- Check total votes today
SELECT COUNT(*) as votes_today
FROM votes
WHERE created_at >= CURRENT_DATE;

-- Check error rate
SELECT 
  COUNT(*) as total_attempts,
  SUM(CASE WHEN error IS NOT NULL THEN 1 ELSE 0 END) as errors
FROM fraud_logs
WHERE created_at >= CURRENT_DATE;`}</pre>
                    </div>
                    <div className="mt-3 space-y-1 text-gray-700">
                      <p>✅ Votes growing steadily</p>
                      <p>✅ Error rate &lt; 2%</p>
                      <p>✅ Duplicate attempts &lt; 1%</p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-bold text-lg mb-2">2. Performance Check</h5>
                    <p className="text-gray-700">Check Vercel Dashboard → Analytics:</p>
                    <ul className="mt-2 space-y-1 text-gray-700">
                      <li>• Response time (target: &lt; 500ms)</li>
                      <li>• Error rate (target: &lt; 0.5%)</li>
                      <li>• Bandwidth usage</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg">
                    <h5 className="font-bold text-lg mb-2">3. Fraud Alert Review</h5>
                    <p className="text-gray-700 mb-2">Look for:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>🚨 High suspicion scores (&gt; 70)</li>
                      <li>🚨 Rapid votes from same IP</li>
                      <li>🚨 VPN/proxy usage patterns</li>
                      <li>🚨 Multiple DOBs same phone</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mid-Day Check */}
              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  ☀️ Mid-Day Check (10 minutes)
                </h4>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-bold text-lg mb-2">1. Vote Velocity</h5>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`-- Votes per hour today
SELECT 
  DATE_TRUNC('hour', created_at) as hour,
  COUNT(*) as votes
FROM votes
WHERE created_at >= CURRENT_DATE
GROUP BY hour
ORDER BY hour DESC;`}</pre>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h5 className="font-bold text-lg mb-2">2. Candidate Distribution</h5>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`-- Top 10 candidates
SELECT 
  c.name,
  va.total_votes,
  va.percentage
FROM vote_aggregates va
JOIN candidates c ON c.id = va.candidate_id
ORDER BY va.total_votes DESC
LIMIT 10;`}</pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evening Report */}
              <div className="border-l-4 border-purple-500 pl-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  🌙 Evening Report (20 minutes)
                </h4>
                
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h5 className="font-bold text-lg mb-2">Daily Summary</h5>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`-- Generate daily report
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_votes,
  COUNT(DISTINCT country) as countries,
  COUNT(DISTINCT candidate_id) as candidates_with_votes
FROM votes
WHERE created_at >= CURRENT_DATE
GROUP BY DATE(created_at);`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Fraud Detection */}
          <section className="bg-white rounded-2xl shadow-xl border-2 border-red-200 p-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              Fraud Detection & Response
            </h3>
            
            <div className="space-y-6">
              {/* Suspicion Levels */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-green-50 border-2 border-green-300 rounded-xl">
                  <h4 className="font-bold text-lg text-green-900 mb-2">Low (0-30)</h4>
                  <p className="text-gray-700 mb-2">Occasional duplicate attempts</p>
                  <p className="text-sm text-green-700"><strong>Action:</strong> Monitor only</p>
                </div>

                <div className="p-6 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
                  <h4 className="font-bold text-lg text-yellow-900 mb-2">Medium (31-60)</h4>
                  <p className="text-gray-700 mb-2">Multiple attempts, rapid patterns</p>
                  <p className="text-sm text-yellow-700"><strong>Action:</strong> Flag for review</p>
                </div>

                <div className="p-6 bg-orange-50 border-2 border-orange-300 rounded-xl">
                  <h4 className="font-bold text-lg text-orange-900 mb-2">High (61-80)</h4>
                  <p className="text-gray-700 mb-2">Clear bot patterns, VPN detected</p>
                  <p className="text-sm text-orange-700"><strong>Action:</strong> Block IP temporarily</p>
                </div>

                <div className="p-6 bg-red-50 border-2 border-red-300 rounded-xl">
                  <h4 className="font-bold text-lg text-red-900 mb-2">Critical (81-100)</h4>
                  <p className="text-gray-700 mb-2">Coordinated attack</p>
                  <p className="text-sm text-red-700"><strong>Action:</strong> Block immediately</p>
                </div>
              </div>

              {/* Investigation Process */}
              <div className="p-6 bg-gray-50 rounded-xl">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Investigation Process</h4>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-blue-600">1.</span>
                    <div>
                      <p className="font-semibold">Identify Suspicious Activity</p>
                      <p className="text-sm">Run SQL query to find high suspicion scores (&gt; 70)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-blue-600">2.</span>
                    <div>
                      <p className="font-semibold">Analyze Pattern</p>
                      <p className="text-sm">Check: Same IP? Same DOB? Time intervals? Geographic anomalies?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-blue-600">3.</span>
                    <div>
                      <p className="font-semibold">Take Action</p>
                      <p className="text-sm">Mark vote as fraudulent or clear if false positive</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-blue-600">4.</span>
                    <div>
                      <p className="font-semibold">Document</p>
                      <p className="text-sm">Keep log of investigation, evidence, and outcome</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Links */}
          <section className="grid md:grid-cols-3 gap-6">
            <Link href="/admin" className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:opacity-90 transition-opacity">
              <Settings className="h-10 w-10 mb-3" />
              <h4 className="text-xl font-bold mb-2">Admin Panel</h4>
              <p className="text-blue-100">Access the admin dashboard</p>
            </Link>

            <a href="https://supabase.com/dashboard" target="_blank" rel="noopener" className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:opacity-90 transition-opacity">
              <Database className="h-10 w-10 mb-3" />
              <h4 className="text-xl font-bold mb-2">Supabase</h4>
              <p className="text-green-100">Database management</p>
            </a>

            <a href="https://vercel.com/dashboard" target="_blank" rel="noopener" className="p-6 bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-xl shadow-lg hover:opacity-90 transition-opacity">
              <TrendingUp className="h-10 w-10 mb-3" />
              <h4 className="text-xl font-bold mb-2">Vercel</h4>
              <p className="text-gray-300">Deployment & analytics</p>
            </a>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600">
            © 2025 HaitiVote by <span className="font-semibold text-[#006CFF]">TechKlein</span>. Administrator Guide.
          </p>
        </div>
      </footer>
    </div>
  );
}
