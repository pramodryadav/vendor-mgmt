'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"


import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/app/components/ui/chart"

import { Users } from 'lucide-react'

import ThemeToggle from '../vendors/components/ToggleTheme'

import { Vendor } from "../types"
import useDashBoard from "./hooks/useDashboard"


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function EnhancedVendorDashboard() {

    const {
        vendors,
        criticalityData,
        vendorTypeData
    } = useDashBoard();



    return (
        <div className={`min-h-screen`}>
            <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
                <div className="p-8">

                    {/* Main content */}

                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Vendor Dashboard</h1>
                        <ThemeToggle />
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card className="bg-blue-50 dark:bg-blue-900">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-100">Total Vendors</CardTitle>
                                <Users className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-900 dark:text-blue-50">{vendors.length}</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-green-50 dark:bg-green-900">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-green-800 dark:text-green-100">Active Vendors</CardTitle>
                                <Users className="h-4 w-4 text-green-600 dark:text-green-300" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-900 dark:text-green-50">{vendors.filter((v: Vendor) => v.status === 'active').length}</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-red-50 dark:bg-red-900">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-red-800 dark:text-red-100">Critical Vendors</CardTitle>
                                <Users className="h-4 w-4 text-red-600 dark:text-red-300" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-900 dark:text-red-50">{vendors.filter((v: Vendor) => v.criticality === 'critical').length}</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-yellow-50 dark:bg-yellow-900">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-yellow-800 dark:text-yellow-100">Pending Vendors</CardTitle>
                                <Users className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-50">{vendors.filter((v: Vendor) => v.status === 'pending').length}</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Vendor Types</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={{}} >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={vendorTypeData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {vendorTypeData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Vendor Criticality</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={{}} >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={criticalityData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Legend />
                                            <Bar dataKey="value" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}