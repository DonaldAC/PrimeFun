export interface Account {
  id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  terms?: boolean;
  agreements?: boolean;
  companyName?: string;
  businessWebsite?: string;
  businessCountry?: string;
  preferredCurrency?: string;
  monthlyRevenue?: string;
  fundingPurpose?:string;
  othersPurpose?:string;
}
