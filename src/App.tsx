import './App.css'

function App() {
    return (
        <div className="app-container">
            <header>
                <h1>🎰 Crypto Lottery</h1>
                <p>Вигравай USDT за виконання завдань</p>
            </header>

            <main>
                <div className="card">
                    <h2>Джекпот тижня</h2>
                    <div className="jackpot-amount">$0.00</div>
                    <button>Взяти участь</button>
                </div>
            </main>
        </div>
    )
}

export default App