import { useState } from "react";
import { db, auth } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";

interface CaseFormProps {
  onSave?: () => void; // callback when case is saved
}

export default function CaseForm({ onSave }: CaseFormProps) {
  const [caseId, setCaseId] = useState("");
  const [petitioner, setPetitioner] = useState("");
  const [respondent, setRespondent] = useState("Commercial Tax Dept");
  const [nextHearing, setNextHearing] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveCase = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      alert("You must be logged in as an officer to add a case");
      return;
    }

    if (!caseId || !petitioner) {
      alert("Case ID and Petitioner are required");
      return;
    }

    setIsSubmitting(true);
    try {
      await setDoc(doc(db, "cases", caseId), {
        caseId,
        petitioner,
        respondent,
        officerID: uid,
        status: "Pending",
        nextHearing,
        remarks,
        createdAt: new Date().toISOString(),
      });

      alert("Case Saved Successfully!");
      setCaseId("");
      setPetitioner("");
      setNextHearing("");
      setRemarks("");
      if (onSave) onSave();
    } catch (error) {
      alert("Error saving case. Please try again.");
      console.error("Error saving case:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-facebook-blue rounded-full flex items-center justify-center text-white font-bold">
          📝
        </div>
        <div>
          <div className="font-semibold text-lg">Create New Case</div>
          <div className="text-facebook-dark-gray">Fill in the case details below</div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Case ID / ARN *
            </label>
            <input
              placeholder="Enter Case ID or ARN"
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              className="facebook-input"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Petitioner *
            </label>
            <input
              placeholder="Enter Petitioner name"
              value={petitioner}
              onChange={(e) => setPetitioner(e.target.value)}
              className="facebook-input"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Respondent
            </label>
            <input
              placeholder="Enter Respondent name"
              value={respondent}
              onChange={(e) => setRespondent(e.target.value)}
              className="facebook-input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Next Hearing Date
            </label>
            <input
              type="date"
              value={nextHearing}
              onChange={(e) => setNextHearing(e.target.value)}
              className="facebook-input"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Remarks
          </label>
          <textarea
            placeholder="Enter any additional remarks or notes"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={4}
            className="facebook-input resize-none"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-facebook-border">
        <div className="text-sm text-facebook-dark-gray">
          * Required fields
        </div>
        
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => {
              setCaseId("");
              setPetitioner("");
              setNextHearing("");
              setRemarks("");
            }}
            className="px-4 py-2 border border-facebook-border rounded-lg text-facebook-dark-gray hover:bg-facebook-gray transition-colors"
          >
            Clear Form
          </button>
          
          <button
            onClick={saveCase}
            disabled={isSubmitting || !caseId || !petitioner}
            className="facebook-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Saving...</span>
              </div>
            ) : (
              "Save Case"
            )}
          </button>
        </div>
      </div>

      {/* Success Message Placeholder */}
      {caseId && petitioner && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-green-600">✓</span>
            <span className="text-sm text-green-800">
              Form is ready to submit. All required fields are filled.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
