export const ROUTES = ['Products', 'QRs', 'Scans', 'Settings']

export const OnboardingTitles = [
  'Basic Info',
  'Personalization',
  'Company Location',
  'Contact Details'
]

export const QRPrice = {
  "DIGITAL": 0.5,
  "PHYSICAL": 0.8
}

export const getQRPrice = (qrType: string) => {
  if (qrType === "DIGITAL") {
    return 0.5
  }
  else if (qrType === "PHYSICAL") {
    return 0.8
  }
  else {
    return 1
  }
}