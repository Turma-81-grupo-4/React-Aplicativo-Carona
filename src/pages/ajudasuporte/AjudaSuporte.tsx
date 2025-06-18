import { HelpCircle, BookOpen, Shield, User, Car, CreditCard, MessageCircle, Phone, Search, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AjudaSuporte = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('todos');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categorias = [
        {
            id: 'conta',
            titulo: 'Conta e Perfil',
            icon: <User className="w-6 h-6" />,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            id: 'viagens',
            titulo: 'Viagens e Caronas',
            icon: <Car className="w-6 h-6" />,
            color: 'bg-green-100 text-green-600'
        },
        {
            id: 'pagamento',
            titulo: 'Pagamentos',
            icon: <CreditCard className="w-6 h-6" />,
            color: 'bg-orange-100 text-orange-600'
        },
        {
            id: 'seguranca',
            titulo: 'Segurança',
            icon: <Shield className="w-6 h-6" />,
            color: 'bg-red-100 text-red-600'
        }
    ];

    const faqItems = [
        {
            categoria: 'conta',
            pergunta: 'Como criar uma conta no Carona?',
            resposta: 'Baixe o aplicativo ou acesse nossa plataforma, clique em "Cadastrar", insira seus dados pessoais e confirme seu e-mail.'
        },
        {
            categoria: 'conta',
            pergunta: 'Como alterar meus dados pessoais?',
            resposta: 'Acesse "Perfil" no menu do aplicativo ou em nossa plataforma e clique no ícone de lápis ao lado de seu nome.'
        },
        {
            categoria: 'conta',
            pergunta: 'Quero alterar minha senha, como faço?',
            resposta: 'Acesse "Perfil" no menu do aplicativo ou em nossa plataforma e clique no botão dourado "Alterar Senha".'
        },
        {
            categoria: 'viagens',
            pergunta: 'Como oferecer uma carona?',
            resposta: 'Na página Home, clique em "Oferecer Carona", insira data, origem, destino, distância, velocidade e número de vagas disponíveis, após isso, só clicar em "Cadastrar Carona".'
        },
        {
            categoria: 'viagens',
            pergunta: 'Como solicitar uma carona?',
            resposta: 'Na página Home, clique em "Buscar Carona" ou em Carona na parte superior de sua tela e escolha entre as opções disponíveis.'
        },
        {
            categoria: 'viagens',
            pergunta: 'Posso cancelar uma viagem?',
            resposta: 'Sim, acesse "Passagens" na parte superior de sua tela e clique em "Desistir da carona". Observe nossa política de cancelamento.'
        },
        {
            categoria: 'pagamento',
            pergunta: 'Quais formas de pagamento aceitas?',
            resposta: 'Aceitamos cartão de crédito, débito, PIX e carteira digital do aplicativo.'
        },
        {
            categoria: 'pagamento',
            pergunta: 'Como funciona o pagamento?',
            resposta: 'O pagamento é processado automaticamente após a confirmação da viagem pelo motorista.'
        },
        {
            categoria: 'seguranca',
            pergunta: 'Como garantir minha segurança?',
            resposta: 'Verifique o perfil do motorista, compartilhe sua viagem e use nosso botão de emergência se necessário.'
        },
        {
            categoria: 'seguranca',
            pergunta: 'Como denunciar um usuário?',
            resposta: 'Acesse o perfil do usuário e clique em "Denunciar" ou entre em contato conosco.'
        }
    ];

    const filteredFAQ = faqItems.filter(item => {
        const matchesCategory = selectedCategory === 'todos' || item.categoria === selectedCategory;
        const matchesSearch = item.pergunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.resposta.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
                            Ajuda e Suporte
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            Encontre respostas rápidas para suas dúvidas sobre o Carona
                        </p>
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <section className="py-16 bg-gray-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <div className="flex items-center mb-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mr-4">
                                <Search className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Como podemos ajudar?</h2>
                        </div>

                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Digite sua dúvida aqui..."
                                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-gray-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-6">
                            <BookOpen className="w-8 h-8 text-orange-600" />
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Categorias de Ajuda</h2>
                        <p className="text-lg text-gray-700">
                            Escolha uma categoria para encontrar respostas específicas
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <button
                            onClick={() => setSelectedCategory('todos')}
                            className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left ${selectedCategory === 'todos'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            <div className={`flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${selectedCategory === 'todos'
                                ? 'bg-gray-100 text-gray-600'
                                : 'bg-gray-100 text-gray-600'
                                }`}>
                                <HelpCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Todas as Dúvidas</h3>
                            <p className={`text-sm ${selectedCategory === 'todos' ? 'text-blue-100' : 'text-gray-600'}`}>
                                Ver todas as perguntas
                            </p>
                        </button>

                        {categorias.map((categoria) => (
                            <button
                                key={categoria.id}
                                onClick={() => setSelectedCategory(categoria.id)}
                                className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left ${selectedCategory === categoria.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                <div className={`flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${selectedCategory === categoria.id
                                    ? categoria.color
                                    : categoria.color
                                    }`}>
                                    {categoria.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{categoria.titulo}</h3>
                                <p className={`text-sm ${selectedCategory === categoria.id ? 'text-blue-100' : 'text-gray-600'}`}>
                                    Dúvidas sobre {categoria.titulo.toLowerCase()}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        {selectedCategory === 'todos' ? 'Perguntas Frequentes' :
                            `Dúvidas sobre ${categorias.find(c => c.id === selectedCategory)?.titulo}`}
                    </h2>

                    <div className="space-y-4">
                        {filteredFAQ.length > 0 ? (
                            filteredFAQ.map((item, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                                <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                                                {item.pergunta}
                                            </h4>
                                            <p className="text-gray-700 leading-relaxed pl-7">
                                                {item.resposta}
                                            </p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 text-lg">
                                    Nenhuma pergunta encontrada com os filtros selecionados.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Contact Support Section */}
            <section className="py-16 bg-gray-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6 mx-auto">
                                <MessageCircle className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Não encontrou sua resposta?
                            </h3>
                            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                                Nossa equipe de suporte está pronta para ajudar você com qualquer dúvida ou problema.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to={"/faleconosco"}>
                                    <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center gap-2">
                                        <MessageCircle className="w-5 h-5" />
                                        Fale Conosco
                                    </button>
                                </Link>
                                <a
                                    href="tel:(11)98765-4321"
                                    className="bg-white border-2 border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Phone className="w-5 h-5" />
                                    (11) 98765-4321
                                </a>
                            </div>
                        </div>
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

export default AjudaSuporte;