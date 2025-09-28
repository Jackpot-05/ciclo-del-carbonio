import SectionCard from '../SectionCard'
import { BookOpen, Vote, Image, Leaf } from 'lucide-react'

export default function SectionCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto p-4">
      <SectionCard
        title="Ciclo del Carbonio"
        description="Scopri come il carbonio si muove tra atmosfera, biosfera, idrosfera e geosfera in questo importante ciclo biogeochimico."
        href="/ciclo-carbonio"
        icon={<BookOpen className="h-5 w-5" />}
        color="primary"
      />
      
      <SectionCard
        title="Vote Interattivo"
        description="Metti alla prova le tue conoscenze con il nostro quiz interattivo sul ciclo del carbonio."
        href="/quiz"
        icon={<Vote className="h-5 w-5" />}
        color="accent"
      />
      
      <SectionCard
        title="Infografiche"
        description="Esplora le nostre infografiche educative che illustrano visivamente i processi del ciclo del carbonio."
        href="/infografiche"
        icon={<Image className="h-5 w-5" />}
        color="primary"
      />
      
      <SectionCard
        title="Educazione Civica"
        description="Comprendi l'impatto delle attività umane sul ciclo del carbonio e sui cambiamenti climatici."
        href="/educazione-civica"
        icon={<Leaf className="h-5 w-5" />}
        color="accent"
      />
    </div>
  )
}