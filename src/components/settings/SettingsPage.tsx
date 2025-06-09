
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const [sqlEnabled, setSqlEnabled] = useState(true);
  const [nosqlEnabled, setNosqlEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [newTokenName, setNewTokenName] = useState('');

  const [apiTokens] = useState([
    { id: 1, name: 'Production API', token: 'zdb_prod_****', created: '2024-01-15', lastUsed: '2 hours ago' },
    { id: 2, name: 'Development', token: 'zdb_dev_****', created: '2024-01-10', lastUsed: '1 day ago' },
    { id: 3, name: 'Testing', token: 'zdb_test_****', created: '2024-01-05', lastUsed: 'Never' },
  ]);

  const createApiToken = async () => {
    if (!newTokenName) {
      toast({
        title: "Token name required",
        description: "Please provide a name for the API token.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newToken = `zdb_${Date.now()}_abcd1234`;
      
      // Copy to clipboard
      await navigator.clipboard.writeText(newToken);
      
      toast({
        title: "API token created! 🔑",
        description: "Token has been copied to clipboard. Save it securely.",
      });
      
      setNewTokenName('');
    } catch (error) {
      toast({
        title: "Failed to create token",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const revokeToken = async (tokenId: number) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Token revoked",
        description: "The API token has been permanently disabled.",
      });
    } catch (error) {
      toast({
        title: "Failed to revoke token",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const saveSettings = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings saved! ⚙️",
        description: "Your preferences have been updated.",
      });
    } catch (error) {
      toast({
        title: "Failed to save settings",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure your ZDB instance preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Database Engines</CardTitle>
            <CardDescription>
              Enable or disable database engines
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>SQL Engine</Label>
                <p className="text-sm text-muted-foreground">
                  SQLite-based relational database
                </p>
              </div>
              <Switch checked={sqlEnabled} onCheckedChange={setSqlEnabled} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>NoSQL Engine</Label>
                <p className="text-sm text-muted-foreground">
                  TinyDB-based document database
                </p>
              </div>
              <Switch checked={nosqlEnabled} onCheckedChange={setNosqlEnabled} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle dark theme interface
                </p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <Button onClick={saveSettings} className="w-full">
              Save Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Tokens</CardTitle>
            <CardDescription>
              Manage API access tokens
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Create New Token</Label>
              <div className="flex space-x-2">
                <Input
                  value={newTokenName}
                  onChange={(e) => setNewTokenName(e.target.value)}
                  placeholder="Token name"
                />
                <Button onClick={createApiToken}>
                  Create
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Existing Tokens</Label>
              {apiTokens.map((token) => (
                <div key={token.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">{token.name}</div>
                    <div className="text-sm text-muted-foreground font-mono">
                      {token.token}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>Created: {token.created}</span>
                      <span>•</span>
                      <span>Last used: {token.lastUsed}</span>
                    </div>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => revokeToken(token.id)}
                  >
                    Revoke
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Webhook Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Webhook Configuration</CardTitle>
          <CardDescription>
            Configure webhook endpoints for external integrations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Insert Webhook URL</Label>
              <Input placeholder="https://your-domain.com/webhook/insert" />
            </div>
            <div className="space-y-2">
              <Label>Query Webhook URL</Label>
              <Input placeholder="https://your-domain.com/webhook/query" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Webhook Status</Badge>
            <Badge variant="secondary">🟢 Active</Badge>
          </div>

          <Button>
            Update Webhooks
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
