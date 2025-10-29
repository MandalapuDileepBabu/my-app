import React, { useEffect, useState, ChangeEvent } from "react";
import { auth, db, storage } from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface ProfileProps {
  username: string;
}

const Profile: React.FC<ProfileProps> = ({ username }) => {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    photoURL: "",
  });

  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("User not logged in");
          return;
        }
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setProfileData({
            username: userDoc.data().username || "",
            email: user.email || "",
            phone: userDoc.data().phone || "",
            address: userDoc.data().address || "",
            role: userDoc.data().role || "user",
            photoURL: userDoc.data().photoURL || "",
          });
        } else {
          setError("User profile not found");
          setProfileData(prev => ({ ...prev, email: user.email || "" }));
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file");
      return;
    }
    setUploadError(null);
    setUploadProgress(0);

    const user = auth.currentUser;
    if (!user) {
      setUploadError("User not logged in");
      setUploadProgress(null);
      return;
    }

    const storageRef = ref(storage, `profile-photos/${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(prog);
      },
      (error) => {
        setUploadError(error.message);
        setUploadProgress(null);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setProfileData(prev => ({ ...prev, photoURL: downloadURL }));
        setUploadProgress(null);
        setUploadError(null);
      }
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const user = auth.currentUser;
      if (!user) {
        setError("User not logged in");
        setSaving(false);
        return;
      }
      await setDoc(
        doc(db, "users", user.uid),
        {
          username: profileData.username,
          phone: profileData.phone,
          address: profileData.address,
          photoURL: profileData.photoURL,
          role: profileData.role,
        },
        { merge: true }
      );
      setSuccessMsg("Profile updated successfully");
    } catch (err: any) {
      setError(err.message);
    }
    setSaving(false);
  };

  return (
    <main style={{ maxWidth: 700, margin: "40px auto", padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ marginBottom: 24 }}>Profile Dashboard</h2>

      {error && <p style={{ color: "#b00020", marginBottom: 16 }}>{error}</p>}
      {successMsg && <p style={{ color: "#2e7d32", marginBottom: 16 }}>{successMsg}</p>}

      <section style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        {profileData.photoURL ? (
          <img
            src={profileData.photoURL}
            alt="Profile"
            style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", marginRight: 20, border: "2px solid #29b430" }}
          />
        ) : (
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: "#ddd",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 48,
              color: "#aaa",
              marginRight: 20,
              border: "2px solid #29b430",
            }}
          >
            ?
          </div>
        )}

        <div>
          <label htmlFor="photo-upload" style={{ cursor: "pointer", color: "#29b430", fontWeight: "600" }}>
            Change Profile Photo
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: "none" }}
            disabled={uploadProgress !== null}
          />
          {uploadProgress !== null && (
            <progress value={uploadProgress} max={100} style={{ width: "100%", marginTop: 8 }}></progress>
          )}
          {uploadError && <p style={{ color: "#b00020" }}>{uploadError}</p>}
        </div>
      </section>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={profileData.username}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
            required
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>Email (read-only):</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            readOnly
            style={{ width: "100%", padding: 8, marginTop: 6, backgroundColor: "#f5f5f5" }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>Address:</label>
          <textarea
            name="address"
            value={profileData.address}
            onChange={handleChange}
            rows={3}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label>Role (read-only):</label>
          <input
            type="text"
            name="role"
            value={profileData.role}
            readOnly
            style={{ width: "100%", padding: 8, marginTop: 6, backgroundColor: "#f5f5f5" }}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "12px 24px",
            backgroundColor: "#29b430",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            fontSize: 16,
            fontWeight: "600",
            cursor: saving ? "not-allowed" : "pointer",
          }}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </main>
  );
};

export default Profile;
