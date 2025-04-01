
import { Vendor } from "@/app/types";
import { useEffect, useState } from "react";

const useDashBoard = () => {
    const [vendors, setVendors] = useState([])

    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch('/api/vendors');
            const data = await res.json()
            setVendors(data)
        }
        fetchPosts()
    }, [])


    const criticality: Record<string, number> = {};
    const vendorType: Record<string, number> = {};
  
    vendors.forEach((v: Vendor) => {
      
        criticality[v.criticality] = (criticality[v.criticality] || 0) + 1;
        vendorType[v.type] = (criticality[v.type] || 0) + 1;
    });

    const criticalityData: { name: string; value: number }[] = [];
    Object.keys(criticality).forEach((key) => {
        criticalityData.push({
            name: key,
            value: criticality[key]
        })
    })

    const vendorTypeData: { name: string; value: number }[] = [];
    Object.keys(vendorType).forEach((key) => {
        vendorTypeData.push({
            name: key,
            value: vendorType[key]
        })
    })

    return {
        vendors,
        criticalityData,
        vendorTypeData
    }

}

export default useDashBoard