export class SmartPayment {
  constructor(
    public sellingPriceAsset: number | null = null,
    public paymentPlanType: number | null = null,
    public initialInstallment: number | null = null,
    public finalInstallment: number | null = null,
    public interestRate: number | null = null,
    public interestType: string = '',
    public capitalization: string = '',
    public paymentFrequency: number | null = null,
    public notaryCosts: number | null = null,
    public notaryCostsType: string = '',
    public registrationCosts: number | null = null,
    public registrationCostsType: string = '',
    public appraisal: number | null = null,
    public appraisalType: string = '',
    public studyCommission: number | null = null,
    public studyCommissionType: string = '',
    public activationCommission: number | null = null,
    public activationCommissionType: string = '',
    public gps: number | null = null,
    public shippingCosts: number | null = null,
    public administrativeExpenses: number | null = null,
    public lifeInsurance: number | null = null,
    public riskInsurance: number | null = null,
    public discountRate: number | null = null
  ) {}
}