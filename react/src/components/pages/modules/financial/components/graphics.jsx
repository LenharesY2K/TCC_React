import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Download, Filter, Calendar, FileText } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './css/financeiro.css';

export default function Graphics() {
    const [periodo, setPeriodo] = useState('anual');
    const [showSuccess, setShowSuccess] = useState(false);

    // Dados para o gráfico principal (Fluxo de Caixa)
    const dadosFluxoCaixa = [
        { mes: 'Jan', receitas: 45000, despesas: 32000, saldo: 13000 },
        { mes: 'Fev', receitas: 52000, despesas: 38000, saldo: 14000 },
        { mes: 'Mar', receitas: 48000, despesas: 35000, saldo: 13000 },
        { mes: 'Abr', receitas: 61000, despesas: 42000, saldo: 19000 },
        { mes: 'Mai', receitas: 55000, despesas: 39000, saldo: 16000 },
        { mes: 'Jun', receitas: 67000, despesas: 45000, saldo: 22000 },
        { mes: 'Jul', receitas: 72000, despesas: 48000, saldo: 24000 },
        { mes: 'Ago', receitas: 68000, despesas: 46000, saldo: 22000 },
        { mes: 'Set', receitas: 75000, despesas: 51000, saldo: 24000 },
        { mes: 'Out', receitas: 82000, despesas: 55000, saldo: 27000 },
        { mes: 'Nov', receitas: 78000, despesas: 53000, saldo: 25000 },
        { mes: 'Dez', receitas: 85000, despesas: 58000, saldo: 27000 },
    ];

    // Dados para gráfico de categorias de despesas
    const dadosDespesas = [
        { categoria: 'Manutenção', valor: 15000 },
        { categoria: 'Pessoal', valor: 28000 },
        { categoria: 'Água/Luz', valor: 8500 },
        { categoria: 'Limpeza', valor: 6500 },
        { categoria: 'Segurança', valor: 12000 },
        { categoria: 'Outros', valor: 5000 },
    ];

    // Dados para gráfico de inadimplência
    const dadosInadimplencia = [
        { nome: 'Pagos', valor: 85, cor: '#202170' },
        { nome: 'Pendentes', valor: 12, cor: '#3b82f6' },
        { nome: 'Atrasados', valor: 3, cor: '#ef4444' },
    ];

    const totalReceitas = dadosFluxoCaixa.reduce((acc, item) => acc + item.receitas, 0);
    const totalDespesas = dadosFluxoCaixa.reduce((acc, item) => acc + item.despesas, 0);
    const saldo = totalReceitas - totalDespesas;

    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor);
    };

    const handleGerarRelatorio = () => {
        setShowSuccess('Relatório gerado com sucesso!');
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="financeiro-page-container">
            <div className="financeiro-page-wrapper">
                <div className="financeiro-card">
                    <div className="financeiro-card-header">
                        <div className='financeiro-header-content'>
                            <div className="financeiro-header-icon">
                                <DollarSign size={32} />
                            </div>
                            <div>
                                <h1 className="financeiro-header-title">Relatórios Financeiros</h1>
                                <p className="financeiro-header-subtitle">Análise completa das finanças do condomínio</p>
                            </div>
                        </div>
                    </div>

                    {/* Success Message */}
                    {showSuccess && (
                        <div className='financeiro-success-message'>
                            <FileText size={20} />
                            <span className="financeiro-success-text">{showSuccess}</span>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="financeiro-navigation">
                        <button
                            className={`financeiro-nav-button ${periodo === 'mensal' ? 'financeiro-nav-button-active' : ''}`}
                            onClick={() => setPeriodo('mensal')}
                        >
                            <Calendar size={18} />
                            Mensal
                        </button>
                        <button
                            className={`financeiro-nav-button ${periodo === 'trimestral' ? 'financeiro-nav-button-active' : ''}`}
                            onClick={() => setPeriodo('trimestral')}
                        >
                            <Calendar size={18} />
                            Trimestral
                        </button>
                        <button
                            className={`financeiro-nav-button ${periodo === 'anual' ? 'financeiro-nav-button-active' : ''}`}
                            onClick={() => setPeriodo('anual')}
                        >
                            <Calendar size={18} />
                            Anual
                        </button>
                        <button
                            className="financeiro-nav-button"
                            onClick={handleGerarRelatorio}
                        >
                            <Download size={18} />
                            Exportar
                        </button>
                    </div>

                    <div className="financeiro-form-content">
                        {/* Stats Cards */}
                        <div className="financeiro-stats-grid">
                            <div className="financeiro-stat-card financeiro-stat-receitas">
                                <TrendingUp size={24} />
                                <div>
                                    <div className="financeiro-stat-value">{formatarMoeda(totalReceitas)}</div>
                                    <div className="financeiro-stat-label">Total Receitas</div>
                                </div>
                            </div>
                            <div className="financeiro-stat-card financeiro-stat-despesas">
                                <TrendingDown size={24} />
                                <div>
                                    <div className="financeiro-stat-value">{formatarMoeda(totalDespesas)}</div>
                                    <div className="financeiro-stat-label">Total Despesas</div>
                                </div>
                            </div>
                            <div className="financeiro-stat-card financeiro-stat-saldo">
                                <DollarSign size={24} />
                                <div>
                                    <div className="financeiro-stat-value">{formatarMoeda(saldo)}</div>
                                    <div className="financeiro-stat-label">Saldo do Período</div>
                                </div>
                            </div>
                        </div>

                        {/* Gráfico Principal - Fluxo de Caixa */}
                        <div className="financeiro-chart-container financeiro-chart-main">
                            <div className="financeiro-chart-header">
                                <div>
                                    <h2 className="financeiro-chart-title">Fluxo de Caixa Anual</h2>
                                    <p className="financeiro-chart-subtitle">Receitas vs Despesas - 2024</p>
                                </div>
                                <button className="financeiro-button-secondary" onClick={handleGerarRelatorio}>
                                    <Download size={18} />
                                    Exportar
                                </button>
                            </div>
                            <div className="financeiro-chart-content">
                                <ResponsiveContainer width="100%" height={450}>
                                    <LineChart data={dadosFluxoCaixa}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="mes" stroke="#6b7280" />
                                        <YAxis stroke="#6b7280" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '8px',
                                            }}
                                            formatter={(value) => formatarMoeda(value)}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="receitas"
                                            stroke="#10b981"
                                            strokeWidth={3}
                                            name="Receitas"
                                            dot={{ fill: '#10b981', r: 5 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="despesas"
                                            stroke="#ef4444"
                                            strokeWidth={3}
                                            name="Despesas"
                                            dot={{ fill: '#ef4444', r: 5 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="saldo"
                                            stroke="#202170"
                                            strokeWidth={3}
                                            name="Saldo"
                                            dot={{ fill: '#202170', r: 5 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Gráficos Menores */}
                        <div className="financeiro-charts-grid">
                            {/* Gráfico de Despesas por Categoria */}
                            <div className="financeiro-chart-container">
                                <div className="financeiro-chart-header">
                                    <div>
                                        <h2 className="financeiro-chart-title">Despesas por Categoria</h2>
                                        <p className="financeiro-chart-subtitle">Distribuição mensal</p>
                                    </div>
                                </div>
                                <div className="financeiro-chart-content">
                                    <ResponsiveContainer width="100%" height={320}>
                                        <BarChart data={dadosDespesas}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                            <XAxis 
                                                dataKey="categoria" 
                                                stroke="#6b7280" 
                                                angle={-45} 
                                                textAnchor="end" 
                                                height={100}
                                                interval={0}
                                            />
                                            <YAxis stroke="#6b7280" />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#fff',
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: '8px',
                                                }}
                                                formatter={(value) => formatarMoeda(value)}
                                            />
                                            <Bar dataKey="valor" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Gráfico de Inadimplência */}
                            <div className="financeiro-chart-container">
                                <div className="financeiro-chart-header">
                                    <div>
                                        <h2 className="financeiro-chart-title">Status de Pagamentos</h2>
                                        <p className="financeiro-chart-subtitle">Taxa de inadimplência</p>
                                    </div>
                                </div>
                                <div className="financeiro-chart-content">
                                    <ResponsiveContainer width="100%" height={320}>
                                        <PieChart>
                                            <Pie
                                                data={dadosInadimplencia}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ nome, valor }) => `${nome}: ${valor}%`}
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="valor"
                                            >
                                                {dadosInadimplencia.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.cor} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => `${value}%`} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="financeiro-legend">
                                        {dadosInadimplencia.map((item, index) => (
                                            <div key={index} className="financeiro-legend-item">
                                                <div
                                                    className="financeiro-legend-color"
                                                    style={{ backgroundColor: item.cor }}
                                                />
                                                <span className="financeiro-legend-label">{item.nome}: {item.valor}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}