import { Suspense } from "react";
import BookingSystem from '@/components/Consultation/BookingSystem';
export default function InformationPage() {
     return (
            <Suspense >
                <BookingSystem />
            </Suspense>
        );
}