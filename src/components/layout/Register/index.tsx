import { IconDoubleArrow } from '@/components/icons/DoubleArrow'
import { IconPDFDownload } from '@/components/icons/PDFDownload'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { DateFormat } from '@/utils/FormattedDate'
import { formatedPrice } from '@/utils/FormattedPrice'

interface RegistersProps {
  id: number
  method: string
  send: number
  name: string
  amount: number
  created: string
  textColor?: string
}

const Registers: React.FC<RegistersProps> = ({
  id,
  amount,
  created,
  method,
  name,
  send,
  textColor
}) => {
  // const [openModalPrint, setOpenModalPrint] = useState<boolean>(false)

  return (
    <div
      id={id.toString()}
      className={cn(
        'flex items-center justify-between gap-2 border-b-2 border-colorPrimary-500/75 py-4',
        textColor ? '' : 'text-colorPrimary-500'
      )}
    >
      <div className="flex flex-col items-start justify-center gap-1 text-base">
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
          <TooltipTrigger
          // onClick={() => setOpenModalPrint(!openModalPrint)}
          >
            <IconPDFDownload size={32} className="fill-colorPrimary-500" />
          </TooltipTrigger>
          <TooltipContent className="rounded-md bg-colorPrimary-500 p-2 text-sm font-normal text-white">
            Baixar extrato em PDF
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* <ModalPrint
        openModal={openModalPrint}
        setOpenModal={setOpenModalPrint}
        ArrayButton={<></>}
        body={
          <PDFViewer width="100%" height="700px">
            <PDFQRCode
              doc={' - '}
              name={name}
              pix={' - '}
              bank={' - '}
              agency={' - '}
              account={' - '}
            />
          </PDFViewer>
        }
      /> */}
    </div>
  )
}

export default Registers
