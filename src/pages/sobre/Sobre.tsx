import { Users, Target, Heart, Sparkles, Leaf, Shield, Lightbulb, HandHeart } from 'lucide-react';
import { GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react';
import { useEffect } from 'react';

const Sobre = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const integrantes = [{
        nome: "Camille Tarine",
        papel: "Desenvolvedora",
        github: "https://github.com/CahTarine",
        linkedin: "https://www.linkedin.com/in/camille-tarine/",
        img: "/cam.jpeg",
    }

        ,
    {
        nome: "Carlos Henrique",
        papel: "Product Owner",
        github: "https://github.com/Henrykeeh",
        linkedin: "https://www.linkedin.com/in/carlos-henrique-da-silva-barbosa-no-linked-in/",
        img: "/car.jpeg",
    }

        ,
    {
        nome: "Henrique Machado",
        papel: "Desenvolvedor",
        github: "https://github.com/scottineo",
        linkedin: "https://www.linkedin.com/in/luiz-henrique-machado/",
        img: "/hen.jpeg",
    }

        ,
    {
        nome: "Beatriz Bueno",
        papel: "Desenvolvedor",
        github: "https://github.com/BeaKaylanee",
        linkedin: "https://www.linkedin.com/in/beatriz-kailane-3513b5248/",
        img: "/bea.jpeg",
    }

        ,
    {
        nome: "Guilherme Dino",
        papel: "Tester",
        github: "https://github.com/meDinoo",
        linkedin: "https://www.linkedin.com/in/guilherme-dino-pereira/",
        img: "/gui.jpeg",
    }]
    const values = [
        {
            title: "Sustentabilidade",
            description: "Acreditamos que cada carona é um passo em direção a um planeta mais limpo.",
            icon: <Leaf className="w-8 h-8" />
        },
        {
            title: "Colaboração",
            description: "Unimos pessoas com trajetos em comum para construirmos juntos um futuro melhor.",
            icon: <Users className="w-8 h-8" />
        },
        {
            title: "Inovação",
            description: "Usamos a tecnologia para transformar o modo como as pessoas se deslocam.",
            icon: <Lightbulb className="w-8 h-8" />
        },
        {
            title: "Segurança",
            description: "Garantimos um ambiente confiável para todos os nossos usuários.",
            icon: <Shield className="w-8 h-8" />
        },
        {
            title: "Compromisso Social",
            description: "Trabalhamos para melhorar a mobilidade urbana e reduzir a desigualdade no acesso ao transporte.",
            icon: <HandHeart className="w-8 h-8" />
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
                            Sobre a Carona
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            Transformando o transporte urbano através da mobilidade colaborativa
                        </p>
                    </div>
                </div>
            </div>

            {/* Company Story */}
            <section className="py-20 bg-gray-300">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-6">
                            <Sparkles className="w-8 h-8 text-orange-600" />
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-8">Nossa História</h2>
                    </div>

                    <div className="bg-gray-100 rounded-3xl p-8 md:p-12 shadow-lg">
                        <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                            <span className="font-semibold text-blue-600">Carona</span> nasceu da vontade de tornar o transporte urbano mais
                            <span className="font-semibold text-green-600"> sustentável</span>,
                            <span className="font-semibold text-blue-600"> acessível</span> e
                            <span className="font-semibold text-orange-600"> humano</span>.
                            Ao conectar pessoas que compartilham o mesmo trajeto, reduzimos o número de veículos nas ruas,
                            diminuímos a emissão de poluentes e tornamos cada viagem uma oportunidade de fazer a diferença.
                            Junte-se ao movimento por um futuro mais limpo e colaborativo —
                            <span className="font-bold text-gray-900"> Cada carona importa</span>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission, Vision, Values Grid */}
            <section className="py-20 bg-gray-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-8 mb-20">
                        {/* Mission */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                                <Target className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Missão</h3>
                            <p className="text-gray-700 text-center leading-relaxed">
                                Promover uma mobilidade mais inteligente, conectando pessoas que compartilham caminhos e valores,
                                contribuindo para a redução do impacto ambiental e a melhoria da qualidade de vida nas cidades.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 mx-auto">
                                <Sparkles className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Visão</h3>
                            <p className="text-gray-700 text-center leading-relaxed">
                                Ser referência em mobilidade colaborativa no Brasil, transformando o hábito de se locomover
                                em uma atitude consciente, sustentável e acessível para todos.
                            </p>
                        </div>

                        {/* Values Header */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg text-black">
                            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
                                <Heart className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-center mb-4">Nossos Valores</h3>
                            <p className="text-gray-700 text-center leading-relaxed">
                                Os princípios que guiam cada decisão e ação em nossa jornada por uma mobilidade mais consciente.
                            </p>
                        </div>
                    </div>

                    {/* Values Details */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4 text-gray-600">
                                    {value.icon}
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <h2 className="bg-gray-300 text-4xl font-bold text-gray-900 mb-8 text-center" >Nosso Time</h2>
            <div className="m-auto bg-gray-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl w-full mb-12 justify-center items-center" >
                {integrantes.map(({ nome, papel, github, linkedin, img }) => (
                    <div
                        key={nome}
                        className="bg-gradient-to-tr from-white/40 to-white/10 border border-white/30 rounded-xl p-0 shadow-xl backdrop-blur-sm flex flex-col items-center transition-transform hover:scale-105 hover:brightness-110 hover:shadow-2xl"
                    >
                        <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center w-full h-full">
                            {img ? (
                                <img
                                    src={img}
                                    alt={nome}
                                    className="w-32 h-32 object-cover rounded-full mb-4 shadow-md"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#068DBD] to-[#1A5566] flex items-center justify-center text-4xl font-bold text-white mb-4 select-none">
                                    {nome.split(" ").map((n) => n[0]).join("")}
                                </div>
                            )}

                            <h3 className="text-2xl text-black font-semibold mb-1">{nome}</h3>
                            <p className="text-black mb-4 italic">{papel}</p>
                            <div className="flex gap-6">
                                <a
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`GitHub de ${nome}`}
                                    className="hover:text-orange-400 transition-colors"
                                >
                                    <GithubLogoIcon size={40} />
                                </a>
                                <a
                                    href={linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`LinkedIn de ${nome}`}
                                    className="hover:text-[#3c5288] transition-colors"
                                >
                                    <LinkedinLogoIcon size={40} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6">Faça Parte da Mudança</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Juntos, podemos transformar a mobilidade urbana e construir cidades mais sustentáveis para as próximas gerações.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-300 shadow-lg">
                            Baixar o App
                        </button>
                        <button className="cursor-pointer bg-blue-900 border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                            Saiba Mais
                        </button>
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

export default Sobre;