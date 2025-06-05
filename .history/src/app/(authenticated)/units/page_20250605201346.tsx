import { prisma } from "@/lib/prisma";
import UnitPageClient from "./UnitPageClient";
import { UnitWithId } from "@/validations/unit";

export default async function UnitPage() {
    const units: UnitWithId[] = await prisma.unit.findMany();
    return <UnitPageClient units={units} />;
}