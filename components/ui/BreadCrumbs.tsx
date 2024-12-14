'use client';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

function BreadCrumbs() {
    const path = usePathname();
    const segments = path.split("/");
    console.log(segments);

    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem key="home">
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    {segments.map((segment, index) => {
                        if (segment === '' ) return null;
                        let href:string;
                        if(index === segments.length) {
                            href = `${segments.slice(1,index+1).join("/")}`;
                        } else href = "/";

                        console.log(href);
                        return (
                            <Fragment key={index}>
                                 <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                                </BreadcrumbItem>              
                            </Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}

export default BreadCrumbs;
