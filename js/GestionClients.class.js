class GestionClients {
  clients = [];
  prets = [];
  eSelectClient = document.getElementById("selectClient");
  eClient = document.getElementById("client");
  ePrets = document.getElementById("prets");
  tClient = document.getElementById("modeleClient");
  tPret = document.getElementById("modelePret");

  /**
   * Créer un objet gestionnaire de clients
   * @param {Object[]} clients
   * @param {Object[]} prets
   */
  constructor(clients, prets) {
    this.clients = clients;
    this.prets = prets;

    // ajoutez les options de la balise select this.eSelectClient

    //création des options a partir du tableau des clients
    this.clients.forEach((client) => {
      let eOption = document.createElement("option");
      let txtOption = document.createTextNode(
        `${client.nom}, ${client.prenom}`
      );
      eOption.appendChild(txtOption);
      //Insertion de l'option avec nom et prenom du client pointé
      this.eSelectClient.appendChild(eOption);
    });

    this.eSelectClient.addEventListener("change", this.detailClient.bind(this));
  }

  /**
   * Traiter la sélection d'une option de la select d'id selectClient
   * @param {Object} evt
   */
  detailClient(evt) {
    /* Affichez les données du client sélectionné dans la balise section this.eClient
    en utilisant le template this.tClient */

    //remise a zero affichage client
    this.eClient.innerHTML = "";
    //récupreation nom et prenom du client séléctionné
    let clientSelect = [];
    clientSelect = evt.target.value.split(", ");
    //affichage info client
    let wrapper = document.getElementById("wrapper");
    wrapper.style.overflow = "visible";
    this.clients.forEach((client) => {
      if (client.nom == clientSelect[0] && client.prenom == clientSelect[1]) {
        let tHTML = this.tClient.innerHTML;
        //récuperation id client pour retrouver les prets
        clientSelect.push(client.id_client);
        for (let prop in client) {
          tHTML = tHTML.replaceAll(`{${prop}}`, client[prop]);
        }
        this.eClient.insertAdjacentHTML("beforeend", tHTML);
      }
    });

    /* Affichez les données des prêts du client sélectionné dans la balise this.ePrets
        en utilisant le template this.tPret pour chaque prêt */

    //remise a zero affichage
    this.ePrets.innerHTML = "";
    //Affichage prets
    this.prets.forEach((pret) => {
      if (pret.id_client == clientSelect[2]) {
        let tHTML = this.tPret.innerHTML;
        for (let prop in pret) {
          tHTML = tHTML.replaceAll(`{${prop}}`, pret[prop]);
        }
        this.ePrets.insertAdjacentHTML("beforeend", tHTML);
      }
    });

    //Si le client sélectionné n'a aucun prêt, insérez par exemple "<p>Aucun prêt.</p>" dans la section this.ePrets
    if (this.ePrets.innerHTML == "")
      this.ePrets.insertAdjacentHTML("beforeend", "<p>Aucun prêt.</p>");

    /*  Si aucun client n'est sélectionné (option "Sélectionnez un client"), réinitialisez
        les sections this.eClient et this.ePrets

        

        Animez l'affichage de ces sections this.eClient et this.ePrets
        Vous pouvez utiliser par exemple la transition déclarée sur le parent d'id "wrapper"
        ou bien définir toute(s) autre(s) transition(s) à votre convenance
		
        Vous pouvez organiser votre code en ajoutant des méthodes à cette méthode detailClient()     
           
    */
  }
}
