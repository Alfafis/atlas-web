import { ButtonAtlas } from '@/components/Buttons/ButtonAtlas'
import { ButtonNext } from '@/components/Buttons/ButtonNext'
import { IconMovingCar } from '@/components/icons/MovingCar'
import { ModalDefault } from '@/components/layout/Modal/ModalDefault'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import UserApi from '@/services/UserApi'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

interface IRegistrationCode {
  name: string
  agency: string
  account: string
  code: string
  setCode: Dispatch<SetStateAction<string>>
  step: Dispatch<SetStateAction<number>>
}

export const RegistratrionCode: React.FC<IRegistrationCode> = ({
  name,
  agency,
  account,
  code,
  setCode,
  step
}) => {
  const [openModalValidation, setOpenModalValidation] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleChangeAddress = async () => {
    await UserApi.getAddressCode()
      .then((res) => {
        setCode(res.success.match(/:\s*(\w+)/)?.[1])
        setOpenModalValidation(!openModalValidation)
      })
      .catch((e: ErrorResponse) => {
        toast({
          variant: 'destructive',
          title: e.response?.data?.error,
          description: 'por favor tente novamente.'
        })
      })
  }

  const handleCheckCode = async () => {
    setLoading(true)
    await UserApi.checkAddressCode({ code: code })
      .then((res) => {
        toast({
          variant: 'success',
          title: 'Seu código foi confirmado com sucesso!',
          description: res.success
        })
        setOpenModalValidation(false)
        step(2)
      })
      .catch((e: ErrorResponse) => {
        toast({
          variant: 'destructive',
          title: e.response?.data?.error,
          description: 'Tente novamente código.'
        })
      })
      .finally(() => {
        setLoading(true)
      })
  }

  return (
    <>
      <div>
        <h2 className="text-base font-bold">{name}</h2>
        <h4 className="text-sm">Banco: -</h4>
        <h4 className="text-sm">
          Agência {agency} Conta: {account}
        </h4>
      </div>
      <div className="flex flex-row-reverse">
        <Separator className="w-[52%] bg-colorSecondary-500" />
      </div>
      <div className="flex flex-col gap-4 text-base text-colorPrimary-500">
        <p>
          Para evitar fraudes, enviaremos um código para seu e-mail cadastrado.
          Insira-o para prosseguir com a alteração de seu endereço de cadastro.
        </p>
        <ButtonAtlas
          title="Prosseguir com a alteração de endereço"
          click={handleChangeAddress}
          icon={IconMovingCar}
        />
        <ModalDefault
          openModal={openModalValidation}
          setOpenModal={setOpenModalValidation}
          body={
            <>
              <h4>Digite o código de verificação enviado em seu e-mail</h4>
              <Input
                className="text-xl font-semibold text-colorPrimary-500"
                value={code || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCode(e.target.value)
                }
              />
            </>
          }
          ArrayButton={
            <>
              <ButtonNext
                title="Confirmar"
                disabled={code.trim() !== ''}
                loading={loading}
                func={handleCheckCode}
                classPlus="rounded-xl w-full bg-[#008000]"
              />
              <Button
                className="rounded-md bg-[#FF0000]"
                onClick={() => setOpenModalValidation(!openModalValidation)}
              >
                Cancelar
              </Button>
            </>
          }
        />
      </div>
    </>
  )
}
