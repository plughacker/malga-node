import {
  GenerateCardBrand,
  GenerateCardStatus,
  SandboxGenerateCardResponse,
} from './sandbox.types'

const nextYear = new Date().getFullYear() + 1
export const expirationDate = `03/${nextYear}`

export const cards: Record<
  GenerateCardBrand,
  Record<GenerateCardStatus, SandboxGenerateCardResponse>
> = {
  Mastercard: {
    authorized: { number: '5214254988499590', cvv: '220', expirationDate },
    unauthorized: { number: '5171407375927752', cvv: '300', expirationDate },
    timeout: { number: '5402839904300856', cvv: '130', expirationDate },
    authorized_or_timeout: {
      number: '5491266201550748',
      cvv: '260',
      expirationDate,
    },
    blocked_card: { number: '5521448129190195', cvv: '880', expirationDate },
    canceled_card: { number: '5597251149584267', cvv: '340', expirationDate },
    expired_card: { number: '5462320441541663', cvv: '830', expirationDate },
    invalid_cvv: { number: '5240675434648372', cvv: '231', expirationDate },
  },
  Visa: {
    authorized: { number: '4916745120294124', cvv: '560', expirationDate },
    unauthorized: { number: '4916878170842862', cvv: '650', expirationDate },
    timeout: { number: '4485401945979546', cvv: '600', expirationDate },
    authorized_or_timeout: {
      number: '4556613630132678',
      cvv: '850',
      expirationDate,
    },
    blocked_card: { number: '4556684530238865', cvv: '440', expirationDate },
    canceled_card: { number: '4485406132091427', cvv: '170', expirationDate },
    expired_card: { number: '4532552729063643', cvv: '660', expirationDate },
    invalid_cvv: { number: '4716866286004545', cvv: '965', expirationDate },
  },
  Amex: {
    authorized: { number: '371511430434941', cvv: '6560', expirationDate },
    unauthorized: { number: '346924402646172', cvv: '8460', expirationDate },
    timeout: { number: '372763217194656', cvv: '3290', expirationDate },
    authorized_or_timeout: {
      number: '379769909235288',
      cvv: '3240',
      expirationDate,
    },
    blocked_card: { number: '341033144189205', cvv: '4990', expirationDate },
    canceled_card: { number: '342582504975297', cvv: '6820', expirationDate },
    expired_card: { number: '377134064055173', cvv: '6240', expirationDate },
    invalid_cvv: { number: '340035263979895', cvv: '7552', expirationDate },
  },
  HiperCard: {
    authorized: { number: '6062829302997360', cvv: '980', expirationDate },
    unauthorized: { number: '6062820734125142', cvv: '520', expirationDate },
    timeout: { number: '6062828660520236', cvv: '970', expirationDate },
    authorized_or_timeout: {
      number: '6062827833068438',
      cvv: '720',
      expirationDate,
    },
    blocked_card: { number: '6062825739079475', cvv: '530', expirationDate },
    canceled_card: { number: '6062824159779557', cvv: '480', expirationDate },
    expired_card: { number: '6062820196712783', cvv: '840', expirationDate },
    invalid_cvv: { number: '6062823576109778', cvv: '347', expirationDate },
  },
  DinersClub: {
    authorized: { number: '36757624613710', cvv: '490', expirationDate },
    unauthorized: { number: '30306641444422', cvv: '900', expirationDate },
    timeout: { number: '30308603779936', cvv: '540', expirationDate },
    authorized_or_timeout: {
      number: '30392608411448',
      cvv: '410',
      expirationDate,
    },
    blocked_card: { number: '30089464740585', cvv: '180', expirationDate },
    canceled_card: { number: '36176932295997', cvv: '660', expirationDate },
    expired_card: { number: '38955717860903', cvv: '230', expirationDate },
    invalid_cvv: { number: '30383606498545', cvv: '138', expirationDate },
  },
}
