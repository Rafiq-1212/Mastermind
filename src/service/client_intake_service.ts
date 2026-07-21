import { prisma } from "@/lib/prisma";

export async function saveClientIntake(data: {
  name: string;
  email: string;
  dob: string;
  phone: string;
  businessType: string;
  industryDuration: string;
  incomeLevel: string;
  incomeTarget: string;
  meetingTargets: string;
  websiteDetails: string;
  socialLinks: string;
  investmentReady: string;
  foundUs: string[];
}) {
  return prisma.clientIntake.create({
    data: {
      name: data.name,
      email: data.email,
      dob: data.dob,
      phone: data.phone,
      businessType: data.businessType,
      industryDuration: data.industryDuration,
      incomeLevel: data.incomeLevel,
      incomeTarget: data.incomeTarget,
      meetingTargets: data.meetingTargets,
      websiteDetails: data.websiteDetails,
      socialLinks: data.socialLinks,
      investmentReady: data.investmentReady,
      foundUs: data.foundUs,
    },
  });
}
