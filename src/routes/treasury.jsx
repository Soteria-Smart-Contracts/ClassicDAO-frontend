import "../assets/styles/treasury.css";

export default function Treasury() {
  return (
    <div className="treasuryMain">
      <h1>Treasury</h1>
      <div className="treasuryHolder">
        <div className="bigBox">
          <h2 className="mainTitle">Value held:</h2>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td>
                  <b>XXXXX</b>
                </td>
                <td>XXXXX</td>
              </tr>
              <tr>
                <td>
                  <b>XXXXX</b>
                </td>
                <td>XXXXX</td>
              </tr>
              <tr>
                <td>
                  <b>XXXXX</b>
                </td>
                <td>XXXXX</td>
              </tr>
            </tbody>
          </table>
          <div className="total-amount">
            <h2 className="total-treasury">TOTAL:</h2>
            <p>XXXX$</p>
          </div>
        </div>

        <div className="bigBox">
          <div className="title-amount">
            <h2 className="mainTitle">Value in proposals:</h2>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td>
                    <b>XXXXX</b>
                  </td>
                  <td>XXXXX</td>
                </tr>
                <tr>
                  <td>
                    <b>XXXXX</b>
                  </td>
                  <td>XXXXX</td>
                </tr>
                <tr>
                  <td>
                    <b>XXXXX</b>
                  </td>
                  <td>XXXXX</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="total-amount">
            <h2 className="total-treasury">TOTAL:</h2>
            <p>XXXXX$</p>
          </div>
        </div>

        <div className="midBox">
          <h2 className="secondaryTitle">Value held:</h2>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td>
                  <b>XXXXX</b>
                </td>
                <td>XXXXX</td>
              </tr>
              <tr>
                <td>
                  <b>XXXXX</b>
                </td>
                <td>XXXXX</td>
              </tr>
            </tbody>
          </table>
          <div className="total-amount">
            <h2 className="secondaryTitle">TOTAL:</h2>
            <p>XXXXX$</p>
          </div>
        </div>

        <div className="smolBox">
          <h3 className="secondaryTitle">NFTs held:</h3>
          <p>XX</p>
          <h3 className="secondaryTitle">Estimated value:</h3>
          <p>XXXXX$</p>
        </div>

        <div className="smolBox">
          <h3 className="secondaryTitle">Burned CLD:</h3>
          <p>CLD$ XXXX</p>
          <h3 className="secondaryTitle">Burned value:</h3>
          <p>XXXXX$</p>
        </div>
      </div>

      <h2>ROI</h2>
      <div className="roiHolder">
        <table className="roi-table">
          <tbody>
            <tr>
              <th>Asset</th>
              <th>24 hour change</th>
              <th>1 week change</th>
              <th>YTD change</th>
            </tr>
            <tr>
              <td>XXXX</td>
              <td>XX%</td>
              <td>XX%</td>
              <td>XX%</td>
            </tr>
            <tr>
              <td>XXXX</td>
              <td>XX%</td>
              <td>XX%</td>
              <td>XX%</td>
            </tr>
            <tr>
              <td>XXXX</td>
              <td>XX%</td>
              <td>XX%</td>
              <td>XX%</td>
            </tr>
            <tr>
              <td>XXXX</td>
              <td>XX%</td>
              <td>XX%</td>
              <td>XX%</td>
            </tr>
            <tr>
              <td>XXXX</td>
              <td>XX%</td>
              <td>XX%</td>
              <td>XX%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
