export default function Main(props) {
    return (
        <div className="App">
            <h1>Main page</h1>
            <button onClick={props.goToCheckAreaPage}>Go to check area page</button>
        </div>
    );
}
