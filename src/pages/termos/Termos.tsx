import { Shield, FileText, Users, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Termos = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            title: "Aceitação dos Termos",
            icon: <CheckCircle className="w-6 h-6" />,
            content: "Ao utilizar o aplicativo Carona, você concorda com estes termos de uso. Se não concordar com algum ponto, não utilize nossos serviços."
        },
        {
            title: "Sobre o Serviço",
            icon: <Info className="w-6 h-6" />,
            content: "O Carona é uma plataforma que conecta pessoas para compartilhamento de viagens, promovendo mobilidade sustentável e colaborativa."
        },
        {
            title: "Responsabilidades do Usuário",
            icon: <Users className="w-6 h-6" />,
            content: "Os usuários devem fornecer informações verdadeiras, respeitar outros usuários e seguir as leis de trânsito durante as viagens compartilhadas."
        },
        {
            title: "Segurança e Privacidade",
            icon: <Shield className="w-6 h-6" />,
            content: "Protegemos seus dados pessoais e implementamos medidas de segurança. Não compartilhamos informações com terceiros sem autorização."
        },
        {
            title: "Limitações de Responsabilidade",
            icon: <AlertTriangle className="w-6 h-6" />,
            content: "O Carona atua apenas como intermediário. Não somos responsáveis por incidentes durante as viagens ou ações dos usuários."
        },
        {
            title: "Modificações dos Termos",
            icon: <FileText className="w-6 h-6" />,
            content: "Reservamos o direito de modificar estes termos. Usuários serão notificados sobre mudanças significativas através do aplicativo."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-300">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="rounded-full">
                                <img src='/logocarona.png' className="w-50 h-50" />
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Termos de Uso
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            Condições gerais para uso da plataforma e do aplicativo Carona
                        </p>
                    </div>
                </div>
            </div>

            {/* Introduction */}
            <section className="py-20 bg-gray-300">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
                            <FileText className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-8">Bem-vindo aos Nossos Termos</h2>
                    </div>

                    <div className="bg-gray-100 rounded-3xl p-8 md:p-12 shadow-lg">
                        <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                            Estes termos estabelecem as regras para uso da plataforma
                            <span className="font-semibold text-blue-600"> Carona</span>.
                            Desenvolvemos estes termos de forma
                            <span className="font-semibold text-green-600"> clara</span> e
                            <span className="font-semibold text-orange-600"> transparente </span>
                            para garantir uma experiência segura e colaborativa para todos os usuários
                            com foco em <span className="font-bold text-gray-900"> mobilidade sustentável</span>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Terms Sections */}
            <section className="py-20 bg-gray-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sections.map((section, index) => (
                            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-6 text-blue-600">
                                    {section.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{section.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Terms */}
            <section className="py-20 bg-gray-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Termos Detalhados</h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Sobre a Plataforma</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    O Carona é uma plataforma desenvolvida para promover mobilidade sustentável e colaborativa,
                                    conectando pessoas que compartilham trajetos similares.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Uso da Plataforma</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    A plataforma deve ser utilizada de forma responsável, respeitando outros usuários
                                    e seguindo as boas práticas de convivência social e segurança no trânsito.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Privacidade e Dados</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Comprometemo-nos a proteger os dados dos usuários de acordo com as melhores práticas
                                    de segurança e privacidade, utilizando as informações apenas para o funcionamento da plataforma.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Responsabilidades</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    O Carona atua como intermediário na conexão entre usuários. Cada usuário é responsável
                                    por suas ações e decisões durante o uso da plataforma.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Contato</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Para dúvidas sobre estes termos ou sobre o funcionamento da plataforma, entre em contato
                                    através dos canais disponibilizados pela equipe.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Last Updated */}
            <section className="py-12 bg-gray-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-gray-100 rounded-xl p-6 shadow-md">
                        <p className="text-gray-600">
                            <span className="font-semibold">Última atualização:</span> Junho de 2025
                        </p>
                        <p className="text-gray-600 mt-2">
                            Versão 1.0
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6">Dúvidas sobre os Termos?</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Nossa equipe está disponível para esclarecer qualquer questão sobre estes termos de uso.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/faleconosco">
                            <button className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-300 shadow-lg">
                                Entre em Contato
                            </button>
                        </Link>
                        <Link to="/">
                            <button className="cursor-pointer bg-blue-900 border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                                Voltar a Página Inicial
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="rounded-full">
                            <img src='/logocarona.png' className="w-50 h-50" />
                        </div>
                    </div>
                    <p className="text-lg font-semibold text-white mb-2">Carona Mobilidade</p>
                    <p>Conectando pessoas, transformando cidades.</p>
                </div>
            </footer>
        </div>
    );
};

export default Termos;