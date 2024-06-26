import { PDFMovements } from '@/components/PDFTypes/PDFMovements'
import { IconDoubleArrow } from '@/components/icons/DoubleArrow'
import { IconPDFDownload } from '@/components/icons/PDFDownload'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useAdm } from '@/contexts/UserContext'
import { formatedPrice } from '@/utils/FormattedPrice'
import { PDFViewer } from '@react-pdf/renderer'
import { useState } from 'react'
import { ModalPrint } from '../Modal/ModaPrint'

export const Movements: React.FC<App.RegisterPixProps> = ({
  id,
  amount,
  created,
  method,
  name,
  send
}) => {
  const { user } = useAdm()
  const [openModalPrint, setOpenModalPrint] = useState<boolean>(false)
  const DateFormat = (value: string): string => {
    const dataObj = new Date(value)

    const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      timeZone: 'America/Sao_Paulo'
    })

    return dataFormatada
  }

  return (
    <div
      id={id.toString()}
      className="grid grid-cols-[4fr,auto,auto] items-center justify-between gap-10 border-b-[1px] border-slate-400 py-2 text-white"
    >
      <div className="flex flex-col items-start justify-center gap-1 text-sm">
        {send > 0 ? (
          <h2 className="flex items-center justify-start gap-1 font-semibold capitalize">
            <IconDoubleArrow
              size={12}
              className="scale-x-[-1] transform fill-colorSecondary-500"
            />
            {method} Enviado
          </h2>
        ) : (
          <h2 className="flex items-center justify-start gap-1 font-semibold capitalize">
            <IconDoubleArrow className="fill-colorSecondary-500" size={12} />
            {method} Recebido
          </h2>
        )}
        <h4 className="flex items-center justify-start gap-1">
          <IconDoubleArrow size={12} className="fill-transparent" />
          {name}
        </h4>
      </div>
      <div className="flex flex-col gap-1 text-end text-xs font-light">
        <p>{DateFormat(created)}</p>
        <label className="font-semibold">
          R$ {send > 0 ? '-' : ''} {formatedPrice(amount.toString())}
        </label>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={() => setOpenModalPrint(!openModalPrint)}>
            <IconPDFDownload size={32} className="fill-white" />
          </TooltipTrigger>
          <TooltipContent className="rounded-md bg-colorPrimary-500 p-2 text-sm font-normal text-white">
            Baixar extrato em PDF
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <ModalPrint
        openModal={openModalPrint}
        setOpenModal={setOpenModalPrint}
        ArrayButton={<></>}
        body={
          <PDFViewer width="100%" height="700px">
            <PDFMovements
              name={user.name}
              document={user.doc}
              type={'in'}
              amount={`R$ ${send > 0 ? '-' : ''} ${formatedPrice(amount.toString())}`}
              bank={user.bank}
              agency={user.agency}
              account={user.account}
              date={new Date().toLocaleDateString()}
            />
          </PDFViewer>
        }
      />
    </div>
  )
}
