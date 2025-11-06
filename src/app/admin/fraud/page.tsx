/**
 * Fraud Detection Dashboard
 * Monitor and analyze suspicious voting patterns
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  ArrowLeft,
  AlertTriangle,
  Shield,
  Clock,
  Globe,
  Phone,
  Calendar,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

interface FraudAlert {
  id: string;
  type: 'duplicate_phone' | 'duplicate_dob' | 'multiple_ip' | 'rapid_voting' | 'vpn_detected';
  severity: 'low' | 'medium' | 'high';
  description: string;
  affectedVotes: number;
  timestamp: string;
  details: any;
}

export default function FraudDashboard() {
  const [alerts, setAlerts] = React.useState<FraudAlert[]>([]);
  const [stats, setStats] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchFraudData();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchFraudData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchFraudData = async () => {
    try {
      const response = await fetch('/api/admin/fraud');
      
      if (!response.ok) {
        throw new Error('Failed to fetch fraud data');
      }

      const data = await response.json();
      setAlerts(data.alerts || []);
      setStats(data.stats || {});
    } catch (error) {
      console.error('Fraud data error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
      default:
        return 'secondary';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'duplicate_phone':
        return <Phone className="h-4 w-4" />;
      case 'duplicate_dob':
        return <Calendar className="h-4 w-4" />;
      case 'multiple_ip':
        return <Globe className="h-4 w-4" />;
      case 'rapid_voting':
        return <Clock className="h-4 w-4" />;
      case 'vpn_detected':
        return <Shield className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const highSeverityCount = alerts.filter(a => a.severity === 'high').length;
  const mediumSeverityCount = alerts.filter(a => a.severity === 'medium').length;
  const lowSeverityCount = alerts.filter(a => a.severity === 'low').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                Fraud Detection
              </h1>
              <p className="text-muted-foreground mt-1">
                Real-time monitoring of suspicious voting patterns
              </p>
            </div>

            {highSeverityCount > 0 && (
              <Badge variant="destructive" className="text-lg px-4 py-2">
                {highSeverityCount} High Priority
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-2 border-red-500/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Severity</p>
                  <p className="text-3xl font-bold text-red-500">
                    {highSeverityCount}
                  </p>
                </div>
                <AlertTriangle className="h-10 w-10 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-500/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Medium Severity</p>
                  <p className="text-3xl font-bold text-yellow-500">
                    {mediumSeverityCount}
                  </p>
                </div>
                <AlertTriangle className="h-10 w-10 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-500/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Low Severity</p>
                  <p className="text-3xl font-bold text-blue-500">
                    {lowSeverityCount}
                  </p>
                </div>
                <AlertTriangle className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detection Stats */}
        {stats && (
          <Card>
            <CardHeader>
              <CardTitle>Detection Statistics</CardTitle>
              <CardDescription>Overview of fraud prevention metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-muted/50 space-y-1">
                  <p className="text-sm text-muted-foreground">Blocked Duplicates</p>
                  <p className="text-2xl font-bold">{formatNumber(stats.blockedDuplicates || 0)}</p>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/50 space-y-1">
                  <p className="text-sm text-muted-foreground">Suspicious IPs</p>
                  <p className="text-2xl font-bold">{formatNumber(stats.suspiciousIPs || 0)}</p>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/50 space-y-1">
                  <p className="text-sm text-muted-foreground">Rapid Attempts</p>
                  <p className="text-2xl font-bold">{formatNumber(stats.rapidAttempts || 0)}</p>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/50 space-y-1">
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">{stats.successRate || '0'}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Alerts Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">
              All Alerts ({alerts.length})
            </TabsTrigger>
            <TabsTrigger value="high">
              High ({highSeverityCount})
            </TabsTrigger>
            <TabsTrigger value="medium">
              Medium ({mediumSeverityCount})
            </TabsTrigger>
            <TabsTrigger value="low">
              Low ({lowSeverityCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {alerts.length === 0 ? (
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertTitle>No Alerts</AlertTitle>
                <AlertDescription>
                  No suspicious activity detected. All systems normal.
                </AlertDescription>
              </Alert>
            ) : (
              alerts.map((alert) => (
                <Alert key={alert.id}>
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <AlertTitle className="flex items-center gap-2">
                        {alert.description}
                        <Badge variant={getSeverityColor(alert.severity) as any}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </AlertTitle>
                      <AlertDescription className="mt-2 space-y-1">
                        <p>Affected votes: {alert.affectedVotes}</p>
                        <p className="text-xs">
                          Detected: {new Date(alert.timestamp).toLocaleString()}
                        </p>
                        {alert.details && (
                          <details className="mt-2">
                            <summary className="cursor-pointer text-xs font-medium">
                              View Details
                            </summary>
                            <pre className="mt-2 p-2 rounded bg-background/50 text-xs overflow-x-auto">
                              {JSON.stringify(alert.details, null, 2)}
                            </pre>
                          </details>
                        )}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))
            )}
          </TabsContent>

          <TabsContent value="high" className="space-y-4">
            {alerts.filter(a => a.severity === 'high').map((alert) => (
              <Alert key={alert.id}>
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <AlertTitle>{alert.description}</AlertTitle>
                    <AlertDescription className="mt-2">
                      <p>Affected votes: {alert.affectedVotes}</p>
                      <p className="text-xs mt-1">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            ))}
          </TabsContent>

          <TabsContent value="medium" className="space-y-4">
            {alerts.filter(a => a.severity === 'medium').map((alert) => (
              <Alert key={alert.id}>
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <AlertTitle>{alert.description}</AlertTitle>
                    <AlertDescription className="mt-2">
                      <p>Affected votes: {alert.affectedVotes}</p>
                      <p className="text-xs mt-1">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            ))}
          </TabsContent>

          <TabsContent value="low" className="space-y-4">
            {alerts.filter(a => a.severity === 'low').map((alert) => (
              <Alert key={alert.id}>
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <AlertTitle>{alert.description}</AlertTitle>
                    <AlertDescription className="mt-2">
                      <p>Affected votes: {alert.affectedVotes}</p>
                      <p className="text-xs mt-1">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
