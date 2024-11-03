"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Zap } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const LoginRegisterPage: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Xử lý đăng ký
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (!name || !email || !password) {
            toast("Register Failed", {
                description: "Name, Email, and Password are required",
            });
            setLoading(false);
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            toast("Success", {
                description: "You have successfully registered",
            });

            // Đăng nhập ngay sau khi đăng ký thành công
            const loginResponse = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const loginData = await loginResponse.json();

            if (!loginResponse.ok) {
                throw new Error(loginData.message || 'Login failed after registration');
            }

            document.cookie = `accessToken=${loginData.accessToken}; path=/`; // Lưu access token vào cookies
            window.location.href = '/home'; // Chuyển hướng đến trang chính

        } catch (err) {
            toast("Error", {
                description: err instanceof Error ? err.message : 'An unexpected error occurred'
            });
        } finally {
            setLoading(false);
        }
    };

    // Xử lý đăng nhập
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            toast("Login Failed", {
                description: "Email and Password are required",
            });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    toast("Error", {
                        description: "Invalid email or password",
                    });
                } else {
                    throw new Error(data.message || 'Login failed');
                }
            }

            document.cookie = `accessToken=${data.accessToken}; path=/`; // Lưu access token vào cookies
            window.location.href = '/home'; // Chuyển hướng đến trang chính

        } catch (err) {
            toast("Error", {
                description: err instanceof Error ? err.message : 'An unexpected error occurred'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 dark:from-gray-900 dark:to-gray-800 transition-all duration-1000">
            <Card className="w-full max-w-md bg-white/80 dark:bg-gray-800/90 backdrop-blur-md shadow-2xl transition-all duration-500">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <Zap className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                        Buzz Chat
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="login" className={cn("data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white", "transition-all duration-300 ease-in-out")}>
                                Sign In
                            </TabsTrigger>
                            <TabsTrigger value="register" className={cn("data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white", "transition-all duration-300 ease-in-out")}>
                                Sign Up
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="login" className="data-[state=inactive]:opacity-0 data-[state=active]:opacity-100 transition-opacity duration-300 ease-in-out">
                            <form className="space-y-4" onSubmit={handleLogin}>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                                    <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 transition-all duration-300" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 transition-all duration-300" />
                                </div>
                                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg" disabled={loading}>
                                    {loading ? "Signing In..." : "Sign In"}
                                </Button>
                                <div className="text-center">
                                    <a href="#" className="text-sm text-blue-600 dark:text-purple-400 hover:underline">Forget Password?</a>
                                </div>
                            </form>
                        </TabsContent>
                        <TabsContent value="register" className="data-[state=inactive]:opacity-0 data-[state=active]:opacity-100 transition-opacity duration-300 ease-in-out">
                            <form className="space-y-4" onSubmit={handleRegister}>
                                <div className="space-y-2">
                                    <Label htmlFor="register-name" className="text-gray-700 dark:text-gray-300">Full Name</Label>
                                    <Input id="register-name" type="text" placeholder="Nguyễn Văn A" value={name} onChange={(e) => setName(e.target.value)} required className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 transition-all duration-300" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="register-email" className="text-gray-700 dark:text-gray-300">Email</Label>
                                    <Input id="register-email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 transition-all duration-300" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="register-password" className="text-gray-700 dark:text-gray-300">Password</Label>
                                    <Input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 transition-all duration-300" />
                                </div>
                                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg" disabled={loading}>
                                    {loading ? "Signing Up..." : "Sign Up"}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <Label htmlFor="dark-mode" className="flex items-center space-x-2 cursor-pointer">
                        <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={toggleDarkMode} className="bg-gray-300 dark:bg-gray-700" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
                    </Label>
                    {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-400" />}
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginRegisterPage;
