import InteractivePanel from '../InteractivePanel'
import { Leaf, Droplets, Wind } from 'lucide-react'

export default function InteractivePanelExample() {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <InteractivePanel
        title="Biosfera"
        icon={<Leaf className="h-5 w-5" />}
        defaultOpen={true}
      >
        <p className="text-sm text-muted-foreground">
          La biosfera include tutti gli organismi viventi sulla Terra. Le piante assorbono CO₂ 
          dall'atmosfera durante la fotosintesi, mentre tutti gli organismi rilasciano CO₂ 
          attraverso la respirazione cellulare.
        </p>
      </InteractivePanel>

      <InteractivePanel
        title="Idrosfera"
        icon={<Droplets className="h-5 w-5" />}
      >
        <p className="text-sm text-muted-foreground">
          Gli oceani sono il più grande serbatoio di carbonio sulla Terra. L'acqua marina 
          assorbe CO₂ dall'atmosfera e la rilascia in un equilibrio dinamico.
        </p>
      </InteractivePanel>

      <InteractivePanel
        title="Atmosfera"
        icon={<Wind className="h-5 w-5" />}
      >
        <p className="text-sm text-muted-foreground">
          L'atmosfera contiene carbonio principalmente sotto forma di anidride carbonica (CO₂). 
          Questo gas serra è fondamentale per la regolazione della temperatura terrestre.
        </p>
      </InteractivePanel>
    </div>
  )
}