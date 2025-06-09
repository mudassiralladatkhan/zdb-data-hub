
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', lastLogin: '2 hours ago', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', lastLogin: '1 day ago', status: 'active' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', lastLogin: '3 days ago', status: 'inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer', lastLogin: '1 week ago', status: 'active' },
  ]);

  const [systemStats] = useState({
    totalUsers: 4,
    activeUsers: 3,
    totalQueries: 15420,
    totalInserts: 8976,
    systemUptime: '15 days, 4 hours',
    databaseSize: '2.4 GB',
  });

  const inviteUser = async () => {
    if (!newUserEmail || !newUserRole) {
      toast({
        title: "Missing information",
        description: "Please provide both email and role.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "User invited successfully! 📧",
        description: `Invitation sent to ${newUserEmail}`,
      });
      
      setNewUserEmail('');
      setNewUserRole('');
    } catch (error) {
      toast({
        title: "Failed to invite user",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const changeUserRole = async (userId: number, newRole: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Role updated",
        description: `User role changed to ${newRole}`,
      });
    } catch (error) {
      toast({
        title: "Failed to update role",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const revokeAccess = async (userId: number) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Access revoked",
        description: "User access has been removed.",
      });
    } catch (error) {
      toast({
        title: "Failed to revoke access",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage users and system administration
        </p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{systemStats.activeUsers}</div>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{systemStats.totalQueries.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Queries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{systemStats.totalInserts.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Inserts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-bold">{systemStats.systemUptime}</div>
            <p className="text-sm text-muted-foreground">System Uptime</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{systemStats.databaseSize}</div>
            <p className="text-sm text-muted-foreground">Database Size</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invite User */}
        <Card>
          <CardHeader>
            <CardTitle>Invite User</CardTitle>
            <CardDescription>
              Send an invitation to join ZDB
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="user@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={newUserRole} onValueChange={setNewUserRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={inviteUser} className="w-full">
              Send Invitation
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              📊 Generate System Report
            </Button>
            <Button variant="outline" className="w-full justify-start">
              🔧 Database Maintenance
            </Button>
            <Button variant="outline" className="w-full justify-start">
              📝 View Audit Logs
            </Button>
            <Button variant="outline" className="w-full justify-start">
              ⬆️ System Backup
            </Button>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>
              Current system status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Database Status</span>
              <Badge variant="default">🟢 Healthy</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">API Status</span>
              <Badge variant="default">🟢 Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Sync Status</span>
              <Badge variant="default">🟢 Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Memory Usage</span>
              <Badge variant="secondary">65%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage user roles and access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Select onValueChange={(role) => changeUserRole(user.id, role)}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Change role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Developer">Developer</SelectItem>
                          <SelectItem value="Viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => revokeAccess(user.id)}
                      >
                        Revoke
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
