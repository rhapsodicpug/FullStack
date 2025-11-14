'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { MainLayout } from '@/components/main-layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for Admin dashboard
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'User', joinedDate: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', joinedDate: '2024-02-20' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Admin', joinedDate: '2024-03-10' },
  { id: '4', name: 'Alice Williams', email: 'alice@example.com', role: 'User', joinedDate: '2024-04-05' },
  { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', joinedDate: '2024-05-12' },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const handleDelete = (userId: string, userName: string) => {
    toast.info('Delete action', {
      description: `Delete functionality for ${userName} would be implemented here.`,
    });
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome, {user?.name} ({user?.role})
            </h1>
            <p className="text-muted-foreground">
              {user?.role === 'Admin' ? 'Admin Control Panel' : 'Your personal dashboard'}
            </p>
          </div>

          {/* Role-specific content */}
          {user?.role === 'User' ? (
            <UserDashboard />
          ) : (
            <AdminDashboard onDelete={handleDelete} />
          )}
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}

function UserDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome!</CardTitle>
        <CardDescription>Your personal dashboard content will appear here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This is your user dashboard. You can view your personal information and manage your account settings here.
        </p>
      </CardContent>
    </Card>
  );
}

function AdminDashboard({ onDelete }: { onDelete: (id: string, name: string) => void }) {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">Active users in the system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Items awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Server Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Online</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage all users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        user.role === 'Admin'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}
                    >
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>{user.joinedDate}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(user.id, user.name)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
