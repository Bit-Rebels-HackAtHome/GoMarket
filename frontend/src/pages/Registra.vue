<template>
  <q-page class="q-pa-md column justify-start flex-center">
    <q-form ref="loginForm" @submit="onSubmit">
      <q-input placeholder="Luogo" filled v-model="citta" v-bind:rules="Richiesto" />
      <q-btn label="Submit" type="submit" color="primary" />
    </q-form>

    <q-list class="q-mt-md" bordered separator v-if="supermercati.length">
      <q-item
        @click="showMarket(supermercato)"
        v-for="(supermercato,ind) in supermercati"
        :key="ind+0.1"
        clickable
        v-ripple
      >
        <q-item-section>{{supermercato.name}}</q-item-section>
        <q-item-section>{{supermercato.address}}</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>

import {EventBus} from './eventBus.js';

export default {
  name: "Registra",

  data() {
    return {
      citta: "",
      supermercati: []
    };
  },

  methods: {
    onSubmit: function(event) {
      this.$axios
        .get(
          `http://localhost:8080/maps/api/place/textsearch/json?query=supermercati+${this.citta}&key=AIzaSyDmb_2t4sICSjR0SocALYyfcw2HUlJzp8k`
        )
        .then(response => {
          console.log(response);
          this.mostraRisultati(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    mostraRisultati(response) {
      while (this.supermercati.length) {
        this.supermercati.pop();
      }
      console.log("entrato");
      var results = response.data.results;

      results.forEach(spm => {
        this.supermercati.push({
          name: spm.name,
          address: spm.formatted_address,
          long: spm.geometry.location.lng,
          lat: spm.geometry.location.lat,
          id: spm.id,
        });
      });
      console.log(this.supermercati);
    },

    showMarket(sm) {
      EventBus.$emit('nuovo-selezionato',sm);
      if (!this.$router.primomarket) {
        this.$router.primomarket = sm;
      }
      this.$router.push("/coda");
    }
  },

  computed: {
    Richiesto() {
      return [v => !!v || "Campo non valido"];
    }
  }
};

var backup = [
  {
    formatted_address: "Viale Tunisia, 1, 20124 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.47671220000001,
        lng: 9.2063381
      },
      viewport: {
        northeast: {
          lat: 45.47810677989273,
          lng: 9.207753229892724
        },
        southwest: {
          lat: 45.47540712010728,
          lng: 9.20505357010728
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "c845916ec7586f4548e000b892742dacf91d3b73",
    name: "Supermercato Market Mister Price Porta Venezia Milano",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 1200,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/111749132087874811489">A Google User</a>'
        ],
        photo_reference:
          "CmRaAAAAm40kR0fLzfkn98acQXg8iJz9tegob-TjqkvwweFuNkeSjRSGvnJ_ZXFP4LO7rS-RQqyu8ftYE6dnuRsEwyhb28-FLG56MfViAAp6bSK0CtHlYpH_sg1MTkAasHfGrXbFEhD3c5lUxtNoDrfjaFmmJp6EGhQsBz-TQErl9HUOLU6gGGcJxjxRtQ",
        width: 1600
      }
    ],
    place_id: "ChIJ1ygzIsfGhkcRboN7H_Ri3MY",
    plus_code: {
      compound_code: "F6G4+MG Milano, MI",
      global_code: "8FQFF6G4+MG"
    },
    rating: 3.5,
    reference: "ChIJ1ygzIsfGhkcRboN7H_Ri3MY",
    types: [
      "grocery_or_supermarket",
      "supermarket",
      "food",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 33
  },
  {
    formatted_address: "Via S. Marco, 26, 20121 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.4764817,
        lng: 9.1886001
      },
      viewport: {
        northeast: {
          lat: 45.47783262989272,
          lng: 9.189900229892723
        },
        southwest: {
          lat: 45.47513297010728,
          lng: 9.18720057010728
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "9259464f506491a99f0338946c3717e6084b8d4a",
    name: "Supermercato Carrefour Express",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 4208,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/102948642341444162368">Andrea Presazzi</a>'
        ],
        photo_reference:
          "CmRaAAAAZ7kJJ5j3WaHTJKS--NEIL3eHAli7s2p_o2Vu9RZQ4E5HofLwsR3-FRUMhcKkMbBnLy2yOk1lW5krmcCB7WIvGODcrlnB1YyIbkmBSi7sO4KnG2ENrgnv0ks5pBfpcW0rEhDs-WeI-N5DNo8byzzcI0YZGhR-wEu0zGuuDmvPwhgjwkwd8b8sxA",
        width: 3120
      }
    ],
    place_id: "ChIJFaxcRLXGhkcRyWDhtzWboLc",
    plus_code: {
      compound_code: "F5GQ+HC Milano, MI",
      global_code: "8FQFF5GQ+HC"
    },
    rating: 4,
    reference: "ChIJFaxcRLXGhkcRyWDhtzWboLc",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 172
  },
  {
    formatted_address: "Piazza Santo Stefano, 6, 20122 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.4622269,
        lng: 9.1942491
      },
      viewport: {
        northeast: {
          lat: 45.46361452989272,
          lng: 9.195655329892723
        },
        southwest: {
          lat: 45.46091487010727,
          lng: 9.19295567010728
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "fdaec7a1dab5d9820c7589f0a75566c804957fa4",
    name: "Carrefour Express",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 1920,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/105395422391057214396">Alessandro Aliverti</a>'
        ],
        photo_reference:
          "CmRaAAAAgCjbiOsteM6Xk0Ypjdkn5VJYyMqzQkBLXEjhPwUhZgy2FrnK99ChgwwJee3TqWgpU9RhEeG30RqarbAEccHXYB6g9De-CO6ZWJvbux0zT8hy-0K63pqSlWfRl7yxzEegEhBIo_0dggnavPA6vvviqUZyGhRIZ0WcksVieENngZRXeqNLB0_gZw",
        width: 1080
      }
    ],
    place_id: "ChIJD0WPrKjGhkcRAEsPTWJkHNY",
    plus_code: {
      compound_code: "F56V+VM Milano, MI",
      global_code: "8FQFF56V+VM"
    },
    rating: 3.7,
    reference: "ChIJD0WPrKjGhkcRAEsPTWJkHNY",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 901
  },
  {
    formatted_address: "Piazzale Luigi Cadorna, 13, 20123 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.4676907,
        lng: 9.1759566
      },
      viewport: {
        northeast: {
          lat: 45.46912587989272,
          lng: 9.177300629892724
        },
        southwest: {
          lat: 45.46642622010728,
          lng: 9.17460097010728
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "f76ae29c6d4fdcc2df687a8883311acdfea8e8cb",
    name: "Supermercato Carrefour Express",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 1920,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/115852034727077420992">Georgy Goliev</a>'
        ],
        photo_reference:
          "CmRZAAAAe8ZZzT8Z6ypfqDlkQt8CgmtDBhaUYs1zGdgTy-HLcIX9zC3CwsqREbQPqN7-zXgxG8cczOX3FuZIjHsA-PSexE6VzdpLSbhC3Wk2EXLtJcRXYr3UDAG9iiyr0cpsWGL-EhBvB_7nJLoemRA1bHITow12GhRshCq-pKcnnTmMQVvB-_5WGVWsow",
        width: 1080
      }
    ],
    place_id: "ChIJA_ijM1DBhkcR3rF6V-gX2w0",
    plus_code: {
      compound_code: "F59G+39 Milano, MI",
      global_code: "8FQFF59G+39"
    },
    rating: 3.8,
    reference: "ChIJA_ijM1DBhkcR3rF6V-gX2w0",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 781
  },
  {
    formatted_address: "Via S. Senatore, 16, 20122 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.4570465,
        lng: 9.1898603
      },
      viewport: {
        northeast: {
          lat: 45.45841392989271,
          lng: 9.191360179892722
        },
        southwest: {
          lat: 45.45571427010727,
          lng: 9.188660520107279
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "0503a2df7e63c9f2feed4cbd6539fae12411f8a2",
    name: "Supermercato Carrefour Express",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 3264,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/107789084352738220049">A Google User</a>'
        ],
        photo_reference:
          "CmRaAAAAs7BeKqK9t_gj1K1qVZ1pZgGJNx-l4LIejXYZ4I7MXmLtapanPT-we9k0NCIZNAGM1lqMwdpoF2V19FWzVXXcnXV8EKguYoBrm3nwv91jYXI69lhe9Tbhs-R3TJSqDADjEhBnvZ7DVRABBu7Z54JSUKTQGhRa9tbWAzF91b69gxUvqAoizGp8Zg",
        width: 2448
      }
    ],
    place_id: "ChIJy_oaigLEhkcRM55U8wy_kUs",
    plus_code: {
      compound_code: "F54Q+RW Milano, MI",
      global_code: "8FQFF54Q+RW"
    },
    rating: 3.7,
    reference: "ChIJy_oaigLEhkcRM55U8wy_kUs",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 556
  },
  {
    formatted_address:
      "Piazza Argentina Ang, Via Antonio Stradivari, 20124 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.48430889999999,
        lng: 9.2152736
      },
      viewport: {
        northeast: {
          lat: 45.48573177989272,
          lng: 9.216697479892723
        },
        southwest: {
          lat: 45.48303212010727,
          lng: 9.213997820107279
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "3e9b60fe5b7f58b6d910b9af31d53ce1b648f6e0",
    name: "Supermercato Carrefour Express",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 1836,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/112296106776091593413">Luca Romoli</a>'
        ],
        photo_reference:
          "CmRaAAAARt_mosQU7bsDPUPr_Tm9QuAF0lvpue5RRbg6jLlGheLOcl2e4anf-Fc1gMWH0WxZjy50QB7oi6KHHpzQDKaz3H-SbOSPy_7pXesrEjs5KTw4jciWEyzQpbDDMUqkhX_YEhDq9ZFiAocYU5O7bI0WPKy9GhSPDmaIyuVwj5izNbiZJ0afEABHTw",
        width: 3264
      }
    ],
    place_id: "ChIJp4vdd-jGhkcRlF27_mDgmPQ",
    plus_code: {
      compound_code: "F6M8+P4 Milano, MI",
      global_code: "8FQFF6M8+P4"
    },
    rating: 3.7,
    reference: "ChIJp4vdd-jGhkcRlF27_mDgmPQ",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 112
  },
  {
    formatted_address: "Via Vincenzo Monti, 55, 20153 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.471787,
        lng: 9.1678068
      },
      viewport: {
        northeast: {
          lat: 45.47318242989272,
          lng: 9.169224529892723
        },
        southwest: {
          lat: 45.47048277010727,
          lng: 9.16652487010728
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "d08dbd697aa59b0762cc3ad420a927d9299f6bb6",
    name: "Supermercato Carrefour Market",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 2988,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/108111796778429113525">jeongin byun</a>'
        ],
        photo_reference:
          "CmRaAAAAozmiosc05OvS85BMdzuLqVz-HdasYKt9UZO-PRjBGwhvCXkV-Rey2ytyJpuaq_BarhkDdbLmkukvKLZy9SMdIVmiC61AUA4ui4P2lTUiXaEgp5t4p9tmxu70iVGQ_EGXEhB44NOE-ZVgLEATcIrrPd3cGhTJqrkmTAT-M58S99qK9Rsxkoivdw",
        width: 5312
      }
    ],
    place_id: "ChIJQ0gvnUPBhkcR80itWI3b974",
    plus_code: {
      compound_code: "F5C9+P4 Milano, MI",
      global_code: "8FQFF5C9+P4"
    },
    rating: 3.8,
    reference: "ChIJQ0gvnUPBhkcR80itWI3b974",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "health",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 652
  },
  {
    formatted_address: "Via Conca del Naviglio, 37, 20123 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.4552778,
        lng: 9.1783333
      },
      viewport: {
        northeast: {
          lat: 45.45659797989272,
          lng: 9.17959817989272
        },
        southwest: {
          lat: 45.45389832010728,
          lng: 9.176898520107276
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "d55e6699390764cfaf35d1cc864c01bf51cc40a3",
    name: "Supermercato Carrefour Express",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 1536,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/112612820807950421361">Antonio Vergallo</a>'
        ],
        photo_reference:
          "CmRaAAAACWJBKxwNY6EAt3Qi2cq9WAdCZJNtD2AMC1baAREHpS1lVf4aAHHoinhxR8AQSwUgALqs8GdXi_7oaJiAO_dTktrs4uwl4vYeerA-S44Wox8i7mG60MZqHT7n6JzR3HpEEhAKqAQD0P2xUZEH0Z1Y0EgxGhQIUApMoxrDdWRnhEnCZHqpHyI_vA",
        width: 2048
      }
    ],
    place_id: "ChIJNf_xIf_DhkcRIzoXI9xz7Qo",
    plus_code: {
      compound_code: "F54H+48 Milano, MI",
      global_code: "8FQFF54H+48"
    },
    rating: 3.8,
    reference: "ChIJNf_xIf_DhkcRIzoXI9xz7Qo",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 380
  },
  {
    formatted_address: "Piazza Antonio Gramsci, 2, 20153 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.4816667,
        lng: 9.1694444
      },
      viewport: {
        northeast: {
          lat: 45.48301652989272,
          lng: 9.17079422989272
        },
        southwest: {
          lat: 45.48031687010727,
          lng: 9.168094570107277
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "e4eb6b677b76bad83e358d84e21cdc6867a1b288",
    name: "Supermercato Carrefour Market",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 3024,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/114963305423102366241">Tetsushi Hoshikawa</a>'
        ],
        photo_reference:
          "CmRaAAAAxO5pEyC3MoHb7evHdXPto4V-GPimXQDNm1S3faY0Oo4w-QfG78ysdLmbvxaplW59NbwKdapjMgQ6zr-Gr0LtTK4gahNl-CnMRMUCw2ZkHb7sALbZ71mN7NxIhZ8xquHQEhDLZtF3H4w7E7cE0nmWEbvuGhRR82eVzlT0fhcxSgVUStnHlIxsVg",
        width: 4032
      }
    ],
    place_id: "ChIJ2d509j7BhkcRs4KDeeGQiEM",
    plus_code: {
      compound_code: "F5J9+MQ Milano, MI",
      global_code: "8FQFF5J9+MQ"
    },
    rating: 3.8,
    reference: "ChIJ2d509j7BhkcRs4KDeeGQiEM",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "health",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 839
  },
  {
    formatted_address: "Via Benedetto Spinoza, 4, 20153 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.47944440000001,
        lng: 9.2247222
      },
      viewport: {
        northeast: {
          lat: 45.48090687989273,
          lng: 9.22618702989272
        },
        southwest: {
          lat: 45.47820722010728,
          lng: 9.223487370107277
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "db2e95443b0c54807d2c2a55dcd7db5d59c9a762",
    name: "Supermercato Carrefour Market",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 2240,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/113870527670615687508">A Google User</a>'
        ],
        photo_reference:
          "CmRaAAAAZGE6bPiep4aexceUF0EAt6jnjvR3Y3h0bgfMTdioO5rD-HonplmdEPgYqg2uKx3IBNcb4ckIYgwiMf6vKEtOFLCRK5Vn6Z_Iq_-qs3ZQohOu8xw_fiUz_PJPNffstzF6EhBEliJ1q49baDPXTja5AKRAGhRoendUK5GqADkaZAvbd2ZsSpodlg",
        width: 3968
      }
    ],
    place_id: "ChIJG-dS7PHGhkcRenHya-ZEjJA",
    plus_code: {
      compound_code: "F6HF+QV Milano, MI",
      global_code: "8FQFF6HF+QV"
    },
    rating: 3.7,
    reference: "ChIJG-dS7PHGhkcRenHya-ZEjJA",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "health",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 1425
  },
  {
    formatted_address: "Via della Moscova, 30, 20121 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.4769997,
        lng: 9.189300099999999
      },
      viewport: {
        northeast: {
          lat: 45.47827472989273,
          lng: 9.190620779892722
        },
        southwest: {
          lat: 45.47557507010728,
          lng: 9.187921120107278
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "9525560fc63960efc20c9986a27f2239331fe761",
    name: "Supermercato Carrefour Express",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 3024,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/105997807418410141742">Niky Jeske</a>'
        ],
        photo_reference:
          "CmRaAAAARMiHSkT9qxWyIEviNGVl_CXsNKnnTs-XxZKp_3UzT5Q5D8XBNu5SCCs18ay3g4dHqd_cQXO4563EsoER_-Ni25bIoNqSZqk2485KXS3vDiK_uu5LbI9WUXmC2bOG29W7EhBOmjj2jDJmLrJdKZYs70RjGhQs3GLz2X1vGKS9_RQWXoLUh-qQNw",
        width: 4032
      }
    ],
    place_id: "ChIJ3fmeX7XGhkcR1PhB4N2QARE",
    plus_code: {
      compound_code: "F5GQ+QP Milano, MI",
      global_code: "8FQFF5GQ+QP"
    },
    rating: 3.7,
    reference: "ChIJ3fmeX7XGhkcR1PhB4N2QARE",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 361
  },
  {
    formatted_address: "Via S. Vito, 10, 20123 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.45918830000001,
        lng: 9.183928
      },
      viewport: {
        northeast: {
          lat: 45.46047997989273,
          lng: 9.185226679892724
        },
        southwest: {
          lat: 45.45778032010728,
          lng: 9.18252702010728
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "fad5469d684b1d7d07d92f4d44f8320d5b1d20ff",
    name: "Carrefour Express - Supermercato",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/110904372355455100555">Mirco Malosti</a>'
        ],
        photo_reference:
          "CmRaAAAAbglmk3Ma15omy9D4g_cSuq7sxfK9mSd1x6lXnCG2HmdH7IvTjrbPsJIK8zHZHTQPi8A0JriSHHqaRtvfPbibkDdTP1dfXdraTWyp4wSDOT-qBtagRwpPe4ZAUqPRrUC4EhAMlFUyzSEiPDqG0Se5Z421GhRN16NidHPw0yEjnfOw13DCN8PzSA",
        width: 1960
      }
    ],
    place_id: "ChIJZ4LPkKrGhkcR5lxd3zkqkE0",
    plus_code: {
      compound_code: "F55M+MH Milano, MI",
      global_code: "8FQFF55M+MH"
    },
    rating: 3.7,
    reference: "ChIJZ4LPkKrGhkcR5lxd3zkqkE0",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 199
  },
  {
    formatted_address:
      "Via Pier Alessandro Paravia, 77, 20148 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.4737941,
        lng: 9.1344604
      },
      viewport: {
        northeast: {
          lat: 45.47513557989272,
          lng: 9.135821629892721
        },
        southwest: {
          lat: 45.47243592010727,
          lng: 9.133121970107277
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "535033b9bbd56ecfc264ac69243c18954cee0f19",
    name: "Supermercato Carrefour Express",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 2988,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/106391495449863531709">A Google User</a>'
        ],
        photo_reference:
          "CmRaAAAAbtTDV6Km2Vv_ASygJ-EvZyDQ06Z8WevwFI8AG0-OzCtme82Nm8f4BTE5ZwoU0H3tpqsKRenk838pbz0SI-v7YWeRWkDK8XQr7scs_XRVWXf5olyAg2fwiM0knDFRZOfCEhA6AjUKs32HfTIEaA-Kn4PlGhS6ign2_FB9oBhXsamMgPMk6WBRjQ",
        width: 5312
      }
    ],
    place_id: "ChIJCRP1gpzBhkcRIQ576rkpgfE",
    plus_code: {
      compound_code: "F4FM+GQ Milano, MI",
      global_code: "8FQFF4FM+GQ"
    },
    rating: 3.5,
    reference: "ChIJCRP1gpzBhkcRIQ576rkpgfE",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 199
  },
  {
    formatted_address: "Viale Famagosta, 16, 20153 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.4366892,
        lng: 9.1576744
      },
      viewport: {
        northeast: {
          lat: 45.43819867989273,
          lng: 9.159014779892722
        },
        southwest: {
          lat: 45.43549902010728,
          lng: 9.156315120107278
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "198f8dde804c3a6e4f6d48791d065322f1ea8251",
    name: "Supermercato Carrefour Market",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 4864,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/118115362591528792504">Stefan Müller</a>'
        ],
        photo_reference:
          "CmRaAAAAFRC-LUO3kc6hch0U_C4WfCxnnarY1ZnBGZC73K6838pg8x2zTrKXg5VvJ6zv8bt14XjDHVI6OXddnyRXcslqSlY1nQz_8q09gYcocLFdBYA_iAW6YIJNvohA9PAivfhLEhDn0qqMqM4AWk6_7_r4doJ5GhSqheOOUJ_o_2PUrJmcnjZOSr9Hew",
        width: 2736
      }
    ],
    place_id: "ChIJQdrm_JPDhkcRW91tJ8rtKsg",
    plus_code: {
      compound_code: "C5P5+M3 Milano, MI",
      global_code: "8FQFC5P5+M3"
    },
    rating: 3.2,
    reference: "ChIJQdrm_JPDhkcRW91tJ8rtKsg",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "health",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 683
  },
  {
    formatted_address: "Via Ancona, 4, 20121 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.4737277,
        lng: 9.1869105
      },
      viewport: {
        northeast: {
          lat: 45.47512837989272,
          lng: 9.188247079892724
        },
        southwest: {
          lat: 45.47242872010727,
          lng: 9.18554742010728
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "1e853c815ac264712f95421e02f2ea2a56466f06",
    name: "Carrefour Express",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/101520088228561874213">Bryan Calderon</a>'
        ],
        photo_reference:
          "CmRaAAAAWeC3lFGsTLh5Y9t1x-reJqCcn2-lDMkdzQLlE2kFq-Soyo0GMirazHhOnBLK73oFKQnoCGZSviMYEBZegs8l05CDEMpQNr9b22HyrzG2gBT8PHvMJFyOXrndGO3OrHKiEhAbmB5h8gKwob6_OGb80zd3GhSQQd4djqxyu4maMnxXYSQO_fZSxw",
        width: 3024
      }
    ],
    place_id: "ChIJj0EOy7TGhkcRmWp1Gscon0E",
    plus_code: {
      compound_code: "F5FP+FQ Milano, MI",
      global_code: "8FQFF5FP+FQ"
    },
    rating: 3.9,
    reference: "ChIJj0EOy7TGhkcRmWp1Gscon0E",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 204
  },
  {
    formatted_address: "Via Lodovico Muratori, 27/29, 20135 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.4516843,
        lng: 9.2091921
      },
      viewport: {
        northeast: {
          lat: 45.45296927989272,
          lng: 9.21050897989272
        },
        southwest: {
          lat: 45.45026962010727,
          lng: 9.207809320107277
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "2be4c1b11dbe550163265185dddeaec7fc6690ff",
    name: "U2 Supermercato",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 2988,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/113228673680784175162">Cristiano Facchetti</a>'
        ],
        photo_reference:
          "CmRaAAAAxAxfmxEPVvxK-yLOoXOYVHTjU687cOBlyI_cJppSR22ApDMD921BOcaKlYl0FuupPf27fnsutsNoci9RUpLsPqxWbGtlBULA4iAc7usQWhMXqtadilcdM0RzOgkaB9Z4EhAWbUaCe60YNs9ebOSjFLNtGhTCV593MhVL65GAdwFT1hIXJM9eNg",
        width: 5312
      }
    ],
    place_id: "ChIJDylHAiTEhkcR1IvPIxQ75W0",
    plus_code: {
      compound_code: "F625+MM Milano, MI",
      global_code: "8FQFF625+MM"
    },
    rating: 4,
    reference: "ChIJDylHAiTEhkcR1IvPIxQ75W0",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 474
  },
  {
    formatted_address:
      "Via Soderini, Viale S. Gimignano, 48, 20153 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.4548293,
        lng: 9.1356858
      },
      viewport: {
        northeast: {
          lat: 45.45617432989272,
          lng: 9.137166579892723
        },
        southwest: {
          lat: 45.45347467010728,
          lng: 9.134466920107279
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "c0cc1a014b01ed24a4d213aae6f0c8fc7347a176",
    name: "Supermercato Carrefour Market",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 4160,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/103726147311966700887">Elizabeth Bancayán</a>'
        ],
        photo_reference:
          "CmRaAAAABBooMPsiBY-LLcBs9D_JJMWETwtu3ZRnbQj-CcU1rhZIn8880V2uHO0WjEtD7w_727TnCOWnRuzF8MLqYPB7i7jcyVDmY8zDmPVH-wwFl1-nJH3zqp4aMKI88aHVql3wEhBwGIhtRYX2vp9G7AKtbJHvGhT1XokMMlIHejqMHsVmgm4_vzDspw",
        width: 2340
      }
    ],
    place_id: "ChIJP2c0z9LDhkcRHlMUi8gEWxs",
    plus_code: {
      compound_code: "F43P+W7 Milano, MI",
      global_code: "8FQFF43P+W7"
    },
    rating: 3.7,
    reference: "ChIJP2c0z9LDhkcRHlMUi8gEWxs",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "health",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 843
  },
  {
    formatted_address: "Viale Monza, 134, 20153 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.5025978,
        lng: 9.2219639
      },
      viewport: {
        northeast: {
          lat: 45.50396472989272,
          lng: 9.223188679892722
        },
        southwest: {
          lat: 45.50126507010728,
          lng: 9.220489020107278
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "557559b9284799f302ca9d5f4ea15e8c632ffe4e",
    name: "Supermercato Carrefour Market",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 1920,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/114104228636964365158">Vincy</a>'
        ],
        photo_reference:
          "CmRaAAAAxkBcJDa-1bb6W1HOfVQGPyZ-z3cMPP30BchEhM2VtnaQvVKGk1QpWzzSx0Zz0XWdPmTiwltd_57PLWhAx1p5GZHydQtdyaiozCz0sV5WtEQbXv7D-PSU9EUMJNMKaQWlEhCFEZKJyz3iT2ptXBAqtcw5GhQFn4CfocGslotczAx03PubRPFxyw",
        width: 1080
      }
    ],
    place_id: "ChIJHVQwKRjHhkcRt41_ACzyzGc",
    plus_code: {
      compound_code: "G63C+2Q Milano, MI",
      global_code: "8FQFG63C+2Q"
    },
    rating: 3.7,
    reference: "ChIJHVQwKRjHhkcRt41_ACzyzGc",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "health",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 1498
  },
  {
    formatted_address: "Via Felice Casati, 32, 20124 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.4795916,
        lng: 9.2019139
      },
      viewport: {
        northeast: {
          lat: 45.48090277989272,
          lng: 9.203226279892721
        },
        southwest: {
          lat: 45.47820312010727,
          lng: 9.200526620107278
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "6c09eb92f9849b0b3772189a8067109d702aed58",
    name: "Supermercato Carrefour Express",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 1836,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/102709201712770973650">cosmo Capurso</a>'
        ],
        photo_reference:
          "CmRaAAAAbHm4o_iOPn_HWE-xjZWas5fllJOJ_OeQoZ45Stjonr1iuPenqziIG4PfJDwhEnmd6C9fmuobPOlceenQU4NvRDqiQacpx7t71XKPjZNGw8g9XTPzeUAvD1fIi-7lkHaZEhCoeYe2ArWUzf1uJZ7oyL13GhR_RlbeW-QknFLMmYsnaa3iuzIxgA",
        width: 3264
      }
    ],
    place_id: "ChIJ4Ug9FcbGhkcR3BMj__0iO7I",
    plus_code: {
      compound_code: "F6H2+RQ Milano, MI",
      global_code: "8FQFF6H2+RQ"
    },
    rating: 3.7,
    reference: "ChIJ4Ug9FcbGhkcR3BMj__0iO7I",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 134
  },
  {
    formatted_address:
      "Largo Giovanni Battista Scalabrini, 1, 20146 Milano MI, Italia",
    geometry: {
      location: {
        lat: 45.4505714,
        lng: 9.1410459
      },
      viewport: {
        northeast: {
          lat: 45.45193127989272,
          lng: 9.142382329892719
        },
        southwest: {
          lat: 45.44923162010727,
          lng: 9.139682670107275
        }
      }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    id: "c0627f16bf78cc6f867a8f9c231b04e57fc4d715",
    name: "Supermercato Carrefour Express",
    opening_hours: {
      open_now: true
    },
    photos: [
      {
        height: 4608,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/110107076681435747047">Salvatore Zizzo</a>'
        ],
        photo_reference:
          "CmRaAAAAVW8VY1ZNbxkTZn9OlTTYhlLbmhcGGMDzaCExNEegHNBPFz1XTp1AIs2-KnMRhE5zyZJebMwOj8obBl-kYJ7X9V8PhhjAq4HHeCuA2CwQ_5MRP0KOZ_1CStTMw01lk7qoEhAl6BXf95X94rSDQbP8po_JGhTJGr64YjYarUPfOGinqfsIGpg2kA",
        width: 3456
      }
    ],
    place_id: "ChIJz1npUM7DhkcRo50Comlm2N0",
    plus_code: {
      compound_code: "F42R+6C Milano, MI",
      global_code: "8FQFF42R+6C"
    },
    rating: 3.8,
    reference: "ChIJz1npUM7DhkcRo50Comlm2N0",
    types: [
      "supermarket",
      "grocery_or_supermarket",
      "food",
      "point_of_interest",
      "store",
      "establishment"
    ],
    user_ratings_total: 54
  }
];
</script>
