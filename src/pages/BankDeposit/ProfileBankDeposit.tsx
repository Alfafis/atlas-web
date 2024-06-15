import { ButtonAtlas } from '@/components/Buttons/ButtonAtlas'
import { IconCopyDatabase } from '@/components/icons/CopyDatabase'
import { IconQRCode } from '@/components/icons/QRCode'
import { IconTicket } from '@/components/icons/Ticket'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { handleCopyClick } from '@/utils/Copy&Paste'
import { formatedPrice } from '@/utils/formatedPrice'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

interface ProfileBankDepositProps {
  state: {
    typePayment: string
    stepPage: number
    selectPayment: number
    amount: string
  }
  setState: Dispatch<
    SetStateAction<{
      typePayment: string
      stepPage: number
      selectPayment: number
      amount: string
    }>
  >
  name: string
  cnpj: string
  bank: string
  agency: string
  account: string
}

const ProfileBankDeposit: React.FC<ProfileBankDepositProps> = ({
  state,
  setState,
  name,
  cnpj,
  bank,
  agency,
  account
}) => {
  const listBankDepositActions = [
    {
      title: 'Copiar dados',
      icon: IconCopyDatabase,
      func: () =>
        handleCopyClick(
          `agencia: ${agency || ''} conta: ${account || ''}`,
          'Sucesso ao copiar dados para deposito',
          'Falha ao copiar dados para deposito'
        )
    },
    {
      title: 'Gerar QR Code para depósito',
      icon: IconQRCode,
      func: () => {
        setState((prev) => ({ ...prev, selectPayment: 1, typePayment: 'qrcode' }))
      }
    },
    {
      title: 'Gerar boleto de recarga',
      icon: IconTicket,
      func: () => {
        setState((prev) => ({ ...prev, selectPayment: 1, typePayment: 'bar' }))
      }
    }
  ]

  return (
    <>
      <div className="flex flex-col gap-2 text-lg font-medium">
        <h4 className="font-normal">
          Titular: <span className="font-semibold">{name || ''}</span>
        </h4>
        <div className="ml-8">
          <h4>
            CNPJ: <span className="font-normal">{cnpj || ''}</span>
          </h4>
          <h4>
            Banco: <span className="font-normal">{bank || ''}</span>
          </h4>
          <h4>
            Agência: <span className="font-normal">{agency || ''}</span>
          </h4>
          <h4>
            Conta: <span className="font-normal">{account || ''}</span>
          </h4>
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <Separator className="w-[52%] bg-colorSecondary-500" />
      </div>
      {state.selectPayment === 0 && (
        <>
          <div className="flex flex-col gap-2 p-2">
            {listBankDepositActions.map(({ title, icon: Icon, func }, number) => (
              <ButtonAtlas key={number} title={title} icon={Icon} click={func} />
            ))}
          </div>
        </>
      )}
      {state.selectPayment === 1 && (
        <>
          <div className="flex items-center gap-2">
            <div className="w-3/12 font-Bills_Bold text-2xl">Define o valor</div>
            <div className='text-colorPrimary-500" flex w-full items-center gap-1 rounded-xl border-2 border-colorPrimary-500 fill-colorPrimary-500 px-2 py-1 text-lg font-medium'>
              <label>R$</label>
              <Input
                className="border-none p-0 text-lg shadow-none"
                type="string"
                value={state.amount}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const format = formatedPrice(e.target.value) || ''
                  setState((prev) => ({
                    ...prev,
                    amount: format
                  }))
                }}
              />
            </div>
          </div>
          <div className="mt-1 flex justify-end">
            <Button
              className="w-6/12 p-2 text-base"
              disabled={state.amount.length <= 0}
              onClick={() => setState((prev) => ({ ...prev, stepPage: 1 }))}
            >
              Prosseguir
            </Button>
          </div>
        </>
      )}
    </>
  )
}

export default ProfileBankDeposit
