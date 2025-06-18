import { Phone, Clock, MapPin, Mail, MessageCircle, Users, Send, Headphones } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ToastAlerta } from '../../utils/ToastAlerta';

const FaleConosco = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: ''
    });

    const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197490458315!2d-46.65906922571362!3d-23.561349561589815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1748956969855!5m2!1spt-BR!2sbr";

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // implementar a lógica de envio do formulário
        console.log('Dados do formulário:', formData);
        ToastAlerta('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'sucesso');
        setFormData({
            nome: '',
            email: '',
            telefone: '',
            assunto: '',
            mensagem: ''
        });
    };

    const contatos = [
        {
            icon: <Phone className="w-8 h-8" />,
            titulo: "Telefone",
            info: "(11) 98765-4321",
            descricao: "Ligue para nossa central de atendimento"
        },
        {
            icon: <Clock className="w-8 h-8" />,
            titulo: "Horário de Atendimento",
            info: "Segunda à Sexta",
            descricao: "08h às 18h"
        },
        {
            icon: <MapPin className="w-8 h-8" />,
            titulo: "Endereço",
            info: "Av. Paulista, São Paulo - SP",
            descricao: "Venha nos visitar pessoalmente"
        },
        {
            icon: <Mail className="w-8 h-8" />,
            titulo: "E-mail",
            info: "contato@carona.com.br",
            descricao: "Resposta em até 24 horas"
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
                                <img src='/logocarona.png' className="w-50 h-50" alt="Logo Carona" />
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Fale Conosco
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            Estamos aqui para ajudar você. Entre em contato conosco!
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Info Cards */}
            <section className="py-20 bg-gray-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
                            <Headphones className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-8">Como Entrar em Contato</h2>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                            Escolha a forma mais conveniente para você. Nossa equipe está sempre pronta para atendê-lo!
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        {contatos.map((contato, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto text-blue-600">
                                    {contato.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{contato.titulo}</h3>
                                <p className="text-lg font-medium text-blue-600 mb-2">{contato.info}</p>
                                <p className="text-gray-600 text-sm">{contato.descricao}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form and Map Section */}
            <section className="py-20 bg-gray-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center mb-6">
                                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mr-4">
                                    <MessageCircle className="w-6 h-6 text-orange-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Envie sua Mensagem</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nome Completo *
                                        </label>
                                        <input
                                            type="text"
                                            name="nome"
                                            value={formData.nome}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            placeholder="Seu nome completo"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            E-mail *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            placeholder="seu@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Telefone
                                        </label>
                                        <input
                                            type="tel"
                                            name="telefone"
                                            value={formData.telefone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            placeholder="(11) 99999-9999"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Assunto *
                                        </label>
                                        <select
                                            name="assunto"
                                            value={formData.assunto}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        >
                                            <option value="">Selecione o assunto</option>
                                            <option value="suporte">Suporte Técnico</option>
                                            <option value="duvida">Dúvidas</option>
                                            <option value="sugestao">Sugestões</option>
                                            <option value="parceria">Parcerias</option>
                                            <option value="outro">Outro</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mensagem *
                                    </label>
                                    <textarea
                                        name="mensagem"
                                        value={formData.mensagem}
                                        onChange={handleInputChange}
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                                        placeholder="Escreva sua mensagem aqui..."
                                    ></textarea>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                    Enviar Mensagem
                                </button>
                            </div>
                        </div>

                        {/* Map Section */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center mb-6">
                                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mr-4">
                                    <MapPin className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Nossa Localização</h3>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-700 mb-4">
                                    Estamos localizados na Av. Paulista, uma das principais avenidas de São Paulo.
                                    Nosso escritório é facilmente acessível por transporte público e possui estacionamento próximo.
                                </p>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p><strong>Endereço:</strong> Av. Paulista, São Paulo - SP</p>
                                    <p><strong>Horário:</strong> Segunda à Sexta, 08h às 18h</p>
                                    <p><strong>Telefone:</strong> (11) 98765-4321</p>
                                </div>
                            </div>

                            {/* Placeholder para o Google Maps */}
                            <div className="w-full h-80 bg-gray-200 rounded-lg  flex items-center justify-center">
                                <div className="w-full h-80 bg-gray-200 rounded-lg border-2 border-dashed border-gray-400 overflow-hidden">
                                    <iframe
                                        src={googleMapsEmbedUrl}
                                        width="100%"
                                        height="100%"
                                        className="w-full h-full"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Mapa das caronas"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-6">
                            <Users className="w-8 h-8 text-orange-600" />
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
                        <p className="text-lg text-gray-700">
                            Algumas das dúvidas mais comuns dos nossos usuários
                        </p>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                pergunta: "Como funciona o sistema de carona?",
                                resposta: "Nosso aplicativo conecta pessoas que fazem trajetos similares, permitindo compartilhar viagens de forma segura, econômica e sustentável."
                            },
                            {
                                pergunta: "O aplicativo é gratuito?",
                                resposta: "Sim! O download e cadastro são gratuitos. Cobramos apenas uma pequena taxa de serviço nas viagens realizadas."
                            },
                            {
                                pergunta: "Como garantir a segurança nas viagens?",
                                resposta: "Todos os usuários passam por verificação de identidade e avaliamos cada viagem através do nosso sistema de reviews."
                            },
                            {
                                pergunta: "Posso cancelar uma carona?",
                                resposta: "Sim, é possível cancelar caronas seguindo nossa política de cancelamento disponível no aplicativo."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">{faq.pergunta}</h4>
                                <p className="text-gray-700">{faq.resposta}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6">Ainda tem dúvidas?</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Nossa equipe está pronta para ajudar você com qualquer questão sobre a Carona.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:(11)98765-4321"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-300 shadow-lg flex items-center justify-center gap-2"
                        >
                            <Phone className="w-5 h-5" />
                            Ligar Agora
                        </a>
                        <button className="bg-blue-900 cursor-pointer border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                            Baixar o App
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="rounded-full">
                            <img src='/logocarona.png' className="w-50 h-50" alt="Logo Carona" />
                        </div>
                    </div>
                    <p className="text-lg font-semibold text-white mb-2">Carona Mobilidade</p>
                    <p>Conectando pessoas, transformando cidades.</p>
                </div>
            </footer>
        </div>
    );
};

export default FaleConosco;