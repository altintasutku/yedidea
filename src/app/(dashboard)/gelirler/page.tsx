import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { ContentLayout } from '@/components/ContentLayout';
import Link from 'next/link';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const GelirlerPage = async () => {
  const session = await getAuthSession()
  if (!session) {
    return redirect('/login')
  }

  return (
    <ContentLayout title="Gelirler">
      <Breadcrumb>
        <BreadcrumbList>
          {/* <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator /> */}
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='bg-background/60 mt-4 p-4 rounded-md'>
        Gelirler content
      </div>
    </ContentLayout>
  )
}

export default GelirlerPage