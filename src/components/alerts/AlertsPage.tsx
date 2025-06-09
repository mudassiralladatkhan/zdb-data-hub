
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

const AlertsPage = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [telegramAlerts, setTelegramAlerts] = useState(false);
  const [webhookAlerts, setWebhookAlerts] = useState(false);
  const [alertEmail, setAlertEmail] = useState('user@example.com');
  const [telegramChatId, setTelegramChatId] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');

  const [alertEvents, setAlertEvents] = useState({
    inserts: true,
    queries: false,
    exports: true,
    errors: true,
  });

  const recentAlerts = [
    { id: 1, type: 'INSERT', message: 'New record added to users table', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'EXPORT', message: 'Data exported from products collection', time: '15 minutes ago', status: 'success' },
    { id: 3, type: 'ERROR', message: 'Query failed on orders table', time: '1 hour ago', status: 'error' },
    { id: 4, type: 'INSERT', message: 'Document added to logs collection', time: '2 hours ago', status: 'success' },
  ];

  const saveAlertSettings = async () => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Alert settings saved! 🔔",
        description: "Your notification preferences have been updated.",
      });
    } catch (error) {
      toast({
        title: "Failed to save settings",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const testAlert = async (type: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: `Test ${type} alert sent! 📧`,
        description: "Check your notification channel.",
      });
    } catch (error) {
      toast({
        title: "Test failed",
        description: "Please check your settings.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Alerts & Notifications</h1>
        <p className="text-muted-foreground">
          Configure and monitor your database alerts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Alert Settings</CardTitle>
            <CardDescription>
              Configure how you want to receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email Alerts */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-alerts">Email Alerts</Label>
                <Switch 
                  id="email-alerts"
                  checked={emailAlerts} 
                  onCheckedChange={setEmailAlerts}
                />
              </div>
              {emailAlerts && (
                <div className="space-y-2">
                  <Input
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    placeholder="your@email.com"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => testAlert('email')}
                  >
                    Test Email
                  </Button>
                </div>
              )}
            </div>

            <Separator />

            {/* Telegram Alerts */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="telegram-alerts">Telegram Alerts</Label>
                <Switch 
                  id="telegram-alerts"
                  checked={telegramAlerts} 
                  onCheckedChange={setTelegramAlerts}
                />
              </div>
              {telegramAlerts && (
                <div className="space-y-2">
                  <Input
                    value={telegramChatId}
                    onChange={(e) => setTelegramChatId(e.target.value)}
                    placeholder="Telegram Chat ID"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => testAlert('telegram')}
                  >
                    Test Telegram
                  </Button>
                </div>
              )}
            </div>

            <Separator />

            {/* Webhook Alerts */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="webhook-alerts">Webhook Alerts</Label>
                <Switch 
                  id="webhook-alerts"
                  checked={webhookAlerts} 
                  onCheckedChange={setWebhookAlerts}
                />
              </div>
              {webhookAlerts && (
                <div className="space-y-2">
                  <Input
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://your-webhook.com/endpoint"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => testAlert('webhook')}
                  >
                    Test Webhook
                  </Button>
                </div>
              )}
            </div>

            <Separator />

            {/* Alert Events */}
            <div className="space-y-3">
              <Label>Alert Events</Label>
              <div className="space-y-3">
                {Object.entries(alertEvents).map(([event, enabled]) => (
                  <div key={event} className="flex items-center justify-between">
                    <span className="capitalize">{event}</span>
                    <Switch
                      checked={enabled}
                      onCheckedChange={(checked) => 
                        setAlertEvents(prev => ({ ...prev, [event]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={saveAlertSettings} className="w-full">
              Save Alert Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>
              Last 10 alert notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant={alert.type === 'ERROR' ? 'destructive' : 'default'}>
                        {alert.type}
                      </Badge>
                      <span className="text-sm font-medium">{alert.message}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {alert.time}
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={alert.status === 'success' ? 'text-green-600' : 'text-red-600'}
                  >
                    {alert.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlertsPage;
