import './Main.css'

export default function Main(props) {
    return (
        <header>
            <h1>Лабораторная работа №4</h1>
            <ul>
                <li>Студент: <span className="author-name">Иванов Алексей Анатольевич</span></li>
                <li>Группа: <span className="cursive">P3211</span></li>
                <li>Вариант: 12086</li>
            </ul>

            <button onClick={props.goToCheckAreaPage}>Go to check area page</button>
        </header>
    );
}
