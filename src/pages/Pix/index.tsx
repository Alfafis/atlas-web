import { IconBuilding } from '@/components/icons/Building'
import { IconCoding } from '@/components/icons/Coding'
import { IconCopyPaste } from '@/components/icons/CopyPaste'
import { IconDepositCoin } from '@/components/icons/DepositCoin'
import { IconEmailSquare } from '@/components/icons/EmailSquare'
import { IconGroupUser } from '@/components/icons/GroupUser'
import { IconKey } from '@/components/icons/Key'
import { IconSmartphone } from '@/components/icons/Smartphone'
import { IconUserSquare } from '@/components/icons/UserSquare'
import { AdminContainer } from '@/components/layout/Container'
import { Title } from '@/components/layout/Text/Title'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { ChevronDown } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const Pix: React.FC = () => {
  const navigate = useNavigate()

  const listPixButton = [
    {
      icon: IconUserSquare,
      name: 'CPF'
    },
    {
      icon: IconBuilding,
      name: 'CNPJ'
    },
    {
      icon: IconSmartphone,
      name: 'Celular'
    },
    {
      icon: IconEmailSquare,
      name: 'E-mail'
    },
    {
      icon: IconCoding,
      name: 'Chave aleatória'
    },
    {
      icon: IconCopyPaste,
      name: 'Copia e Cola'
    }
  ]

  const listPixActions = [
    {
      title: 'Minhas Chaves Pix',
      icon: IconKey,
      path: '/pix/my-keys'
    },
    {
      title: 'Meus Contatos Salvos',
      icon: IconGroupUser,
      path: '/pix/my-contacts'
    },
    {
      title: 'Depositar',
      icon: IconDepositCoin,
      path: '/pix/my-deposits'
    }
  ]

  return (
    <AdminContainer>
      <Title text="Área Pix" back={() => navigate(-1)} />
      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-bold">Enviar Pix</h4>
        <p className="text-sm font-medium">
          Escolha a chave para identificar quem vai receber
        </p>
        <div className="flex w-full items-center justify-between py-4">
          {listPixButton.map(({ name, icon: Icon }, number) => (
            <Link
              className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-colorPrimary-500 bg-transparent fill-colorPrimary-500 text-colorPrimary-500 transition-all duration-300 ease-out hover:bg-colorPrimary-500 hover:fill-white hover:text-white"
              key={number}
              to={`/pix/${name}`}
            >
              <Icon size={number === 4 ? 30 : 40} stroke={2} />
              <span className="text-center text-xs font-medium">{name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <Separator className="w-[52%] bg-colorSecondary-500" />
      </div>
      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className="text-xl font-bold">Use também</h2>
            <ChevronDown size={24} className="transition-transform duration-300" />
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-start justify-between gap-2">
              <div className="flex w-6/12 flex-col gap-2">
                {listPixActions.map(({ title, icon: Icon, path }, number) => (
                  <Link
                    key={number}
                    to={path}
                    className="flex items-center gap-2 rounded-xl border-2 border-colorPrimary-500 fill-colorPrimary-500 p-2 text-base font-bold text-colorPrimary-500"
                  >
                    <Icon size={32} />
                    {title}
                  </Link>
                ))}
              </div>
              <div className="flex w-6/12 flex-col gap-4 px-4 text-xs font-normal">
                <p>
                  Bem-vindo à sua Área Pix, onde você pode aproveitar ao máximo essa
                  revolucionária forma de transferência instantânea. Com o Pix, suas
                  transações são mais rápidas, seguras e acessíveis do que nunca.
                </p>
                <p>
                  Navegue por nossa plataforma intuitiva para enviar e receber
                  pagamentos em segundos, sem a necessidade de informações tediosas
                  como números de conta. É simples assim!
                </p>
                <p>
                  Além disso, você pode gerenciar seus contatos favoritos, configurar
                  pagamentos recorrentes e visualizar seu histórico de transações,
                  tudo em um só lugar.
                </p>
                <p>Descubra uma nova maneira de fazer transações financeiras.</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </AdminContainer>
  )
}

export default Pix