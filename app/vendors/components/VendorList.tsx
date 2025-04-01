
import React from 'react';
import { Vendor } from '@/app/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Badge } from "@/app/components/ui/badge";

import VendorActions from './VendorActions';


type VendorListProps = {
    vendors: Vendor[];
};

const getCriticalityColor = (criticality: string) => {
    switch (criticality.toLowerCase()) {
        case 'low':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        case 'medium':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
        case 'high':
            return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
        case 'critical':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
}

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'active':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        case 'inactive':
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        case 'pending':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
}
export default function VendorList({ vendors }: VendorListProps) {

    return (
        <>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-gray-700 dark:text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Type</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Criticality</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Contact</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Service Provided</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vendors.map((vendor) => (
                        <TableRow key={vendor._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{vendor.name}</TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">{vendor.type}</TableCell>
                            <TableCell>
                                <Badge className={`${getCriticalityColor(vendor.criticality)}`}>
                                    {vendor.criticality}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge className={`${getStatusColor(vendor.status)}`}>
                                    {vendor.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">{vendor.contact}</TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">{vendor.serviceProvided}</TableCell>
                            <TableCell>
                                <VendorActions vendor={vendor} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            
        </>
    )
}
