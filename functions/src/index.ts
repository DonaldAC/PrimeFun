/* eslint-disable max-len */
import * as functions from "firebase-functions";
import axios from "axios";

export interface Application {
  ref: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  terms: boolean;
  agreements: boolean;
  companyName: string;
  businessWebsite: string;
  businessCountry: string;
  monthlyRevenue: number;
  purposeFunding: string;
  pipeDriveId?: number;
}
export interface PipeDriveResponse {
  success: boolean;
  data: {
    data: {
      id: number,
      title: string,
      add_time: Date,
      update_time: Date,
      active: boolean,
      deleted: boolean,
      status: string,
      pipeline_id: number,
    }
  },
}


const pipeDriveApiKey = "c4d007e2615e979a331781e4b72cbb7ed595198e";
const apiRoot = "https://homepersonalcompany.pipedrive.com/api/v1";
const ORG_ID = 1;
let stageId = 1;

export const newApplicationListener = functions.firestore
    .document("accounts/{docId}")
    .onCreate( async (snap, _) => {
      const newValue = snap.data() as Application;

      const data = {
        "title": `${newValue.firstName} ${newValue.lastName}`.trim(),
        "org_id": ORG_ID,
        "stage_id": stageId,
        "e23501424c5cbff7cd7725f577b2ab17bc508b09": newValue.firstName,
        "fe65dafd2baef296892ebdbbf81a691c6045a79c": newValue.lastName,
        "62cde30a325ab3bbfbcf03b71d9d635c08c983c5": newValue.email,
        "19c724ae74f1dd3ea86b452b90432c6b61ab74d8": newValue.companyName,
        "9a9efbb8af4bb9eb9dabb96a13664adf933eeb52": newValue.businessCountry,
        "a56fd73082fdc5cca2af2acb98b5c58d929f3fd4": newValue.businessWebsite,
        "2b2293bbee796ec608200c5146295d5c1cefde1f": newValue.monthlyRevenue,
        "2521ac5b3ce34dcf7d88200bd39201c8675dca68": newValue.phoneNumber,
        "6cdec1147577056142de63faf047b1b66dfbe617": newValue.purposeFunding,
      };

      return await axios.post<any, PipeDriveResponse>(`${apiRoot}/deals?api_token=${pipeDriveApiKey}`, data)
          .then((res) => {
            functions.logger.log("NewDealCreated", `id: ${res.data.data.id}`);
            return snap.ref.set(
                {pipeDriveId: `${res.data.data.id}`},
                {merge: true}
            );
          })
          .catch((err) => {
            functions.logger.log(err.message);
          });
    });


export const UpdateApplicationListener = functions.firestore
    .document("accounts/{docId}")
    .onUpdate(async (snap, _) => {
      if (snap.before.data() && snap.after.data()) {
        const updateValue = snap.after.data() as Application;

        const resp = await axios.get<any, PipeDriveResponse>(`${apiRoot}/deals/${updateValue.pipeDriveId}?api_token=${pipeDriveApiKey}`);
        if (resp.data && resp.data.data.pipeline_id) {
          if (resp.data.data.pipeline_id > stageId) {
            stageId = resp.data.data.pipeline_id;
          }
          const data = {
            "title": `${updateValue.firstName} ${updateValue.lastName}`.trim(),
            "organisation_id": ORG_ID,
            "stage_id": stageId,
            "680219166bfec5557769f83307b637d873ad77ae": updateValue.firstName,
            "befde3b324af168fdaa03322cbfdce31dd2b3f04": updateValue.lastName,
            "6a586458f03278b80a8eff31409beb2ef765503f": updateValue.email,
            "56238c760d87c193a188a7dafe6331d6bafeadd1": updateValue.companyName,
            "1fe5fa145fb68434b95f5873102f2b5c4eafe401": updateValue.businessCountry,
            "fb26426feb0942fee48dfae5ecf007154960cf44": updateValue.businessWebsite,
            "149118fb14a43ce848ee5f445b82c44110084d72": updateValue.monthlyRevenue,
            "12499fe8d64f167ebde3bc7617656cbac180cd3a": updateValue.phoneNumber,
            "12499fe8d74f167ebde3bc7617656cbac180cd5d": updateValue.purposeFunding,
          };
          return await axios.put<any, PipeDriveResponse>(`${apiRoot}/deals/${resp.data.data.id}?api_token=${pipeDriveApiKey}`, data)
              .then((res) => {
                functions.logger.log("Deal update successfully:", `id: ${res.data.data.id}`);
              })
              .catch((err) => {
                functions.logger.log(err.message);
              });
        } else {
          functions.logger.log("Error, update fail: Pipedrive deal not found!");
        }
      }
    });
