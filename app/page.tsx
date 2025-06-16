import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Globe, Mail } from "lucide-react"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Bem-vindo!</CardTitle>
            <CardDescription className="text-lg text-gray-600 max-w-md mx-auto">
              Este é um site básico criado com React e TypeScript. Perfeito para começar seu projeto e configurar seu
              repositório.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="text-center p-4 rounded-lg bg-slate-50">
                <h3 className="font-semibold text-gray-900 mb-2">React + TypeScript</h3>
                <p className="text-sm text-gray-600">Estrutura moderna e tipada para desenvolvimento</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-50">
                <h3 className="font-semibold text-gray-900 mb-2">Pronto para Deploy</h3>
                <p className="text-sm text-gray-600">Configurado para ser facilmente implantado</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button className="flex-1" size="lg">
                <Github className="w-4 h-4 mr-2" />
                Ver Repositório
              </Button>
              <Button variant="outline" className="flex-1" size="lg">
                <Mail className="w-4 h-4 mr-2" />
                Contato
              </Button>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-500">Desenvolvido com ❤️ usando Next.js, React e TypeScript</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
