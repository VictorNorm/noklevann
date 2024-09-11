import React from 'react'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__table-wrapper">
        <table>
          <tbody>
            <tr>
              <td>Henvendelser styret:</td>
              <td>styret@noklevann.no</td>
            </tr>
            <tr>
              <td>Henvendelser drift:</td>
              <td>drift@noklevann.no</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="footer__table-wrapper">
        <table>
          <tbody>
          <tr>
              <td>Driftleders arbeidstid:</td>
              <td>Mandag og tirsdag 08:00-16:00, onsdag 10:00-12:00</td>
            </tr>
            <tr>
              <td>Driftleders telefontid:</td>
              <td>Mandag - onsdag 10:00-12:00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </footer>
  );
}

export default Footer