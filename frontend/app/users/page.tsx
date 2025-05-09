"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users, Search, Filter, MoreHorizontal } from "lucide-react";
import { AddUserDialog } from "@/components/add-user-dialog";

// Define types
interface User {
  id: string;
  name: string;
  email: string;
  userType: string;
  createdAt: string;
  status: string;
}

interface ApiResponse {
  users: User[];
}

interface UserCountResponse {
  userCounts: {
    userType: string;
    count: number;
  }[];
  totalCount: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [userCounts, setUserCounts] = useState<UserCountResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [usersRes, countsRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/users"),
          fetch("http://127.0.0.1:8000/userCountByType"),
        ]);

        if (!usersRes.ok || !countsRes.ok) {
          throw new Error("One or more requests failed.");
        }

        const usersData: ApiResponse = await usersRes.json();
        const countsData: UserCountResponse = await countsRes.json();

        setUsers(usersData.users);
        setUserCounts(countsData);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserTypeCount = (type: string) => {
    return userCounts?.userCounts.find((item) => item.userType === type)?.count || 0;
  };

  const getPercentage = (count: number) => {
    if (!userCounts || userCounts.totalCount === 0) return "0%";
    return `${Math.round((count / userCounts.totalCount) * 100)}% of users`;
  };

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-green-800">User Management</h2>
        {/* <AddUserDialog /> */}
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8 bg-white border-green-200"
          />
        </div>
        <Button variant="outline" className="border-green-200">
          <Filter className="mr-2 h-4 w-4 text-green-700" /> Filter
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{userCounts?.totalCount || 0}</div>
            <p className="text-xs text-green-600">Users in the system</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Farmers</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{getUserTypeCount("farmer")}</div>
            <p className="text-xs text-green-600">{getPercentage(getUserTypeCount("farmer"))}</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inspectors</CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {getUserTypeCount("qualityinspector")}
            </div>
            <p className="text-xs text-blue-600">
              {getPercentage(getUserTypeCount("qualityinspector"))}
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retailers</CardTitle>
            <div className="h-4 w-4 rounded-full bg-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{getUserTypeCount("retailer")}</div>
            <p className="text-xs text-amber-600">{getPercentage(getUserTypeCount("retailer"))}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-green-200">
        <CardHeader className="bg-green-50 border-b border-green-200">
          <CardTitle className="text-green-800">User Directory</CardTitle>
          <CardDescription>Manage system users and their permissions</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
            </div>
          ) : error ? (
            <div className="text-center p-8 text-red-500">{error}</div>
          ) : (
            <Table>
              <TableHeader className="bg-green-50">
                <TableRow>
                  <TableHead className="w-[80px]">User ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>User Type</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  {/* <TableHead className="text-right">Actions</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-green-50">
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          user.userType === "admin"
                            ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                            : user.userType === "farmer"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : user.userType === "quality inspector" ||
                              user.userType === "qualityinspector"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }
                      >
                        {user.userType}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          user.status === "Active"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : user.status === "Inactive"
                            ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    {/* <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
