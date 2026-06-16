"use client";
import { useState } from "react";
import { useApi, apiRequest } from "../layout";
import {
  Plus,
  Copy,
  Pencil,
  Trash2,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react";

export default function ApiKeysPage() {
  const { data, loading, refetch } = useApi<any>("/api-keys/keys", {
    limit: 50,
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);

  const handleRevoke = async (keyId: string) => {
    if (
      !confirm(
        "Are you sure you want to revoke this key? This action cannot be undone.",
      )
    )
      return;
    try {
      await apiRequest(`/api-keys/keys/${keyId}`, { method: "DELETE" });
      refetch();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, show a toast here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold text-[#1A1A2E] tracking-[-0.03em]">
          API Keys
        </h1>
        <button
          onClick={() => {
            setNewKey(null);
            setShowCreateModal(true);
          }}
          className="inline-flex items-center gap-2 bg-[#1A1A2E] text-[#F7F5F0] px-4 py-2 rounded-full text-[13px] font-medium hover:bg-[#2d2d4e] transition-colors"
        >
          <Plus className="w-4 h-4" /> Create Key
        </button>
      </div>

      <div className="bg-white border border-[#1A1A2E]/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#1A1A2E]/[0.02]">
                {["Name", "Key", "Scopes", "Status", "Created", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-[11px] font-medium text-[#1A1A2E]/40 uppercase tracking-wider px-6 py-3"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A2E]/5">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-[#1A1A2E]/40"
                  >
                    Loading...
                  </td>
                </tr>
              ) : (
                (data?.data || []).map((key: any) => (
                  <tr
                    key={key.id}
                    className="hover:bg-[#1A1A2E]/[0.01] transition-colors"
                  >
                    <td className="px-6 py-4 text-[14px] font-medium text-[#1A1A2E]">
                      {key.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code className="text-[13px] bg-[#1A1A2E]/5 px-2 py-1 rounded text-[#1A1A2E]/70 font-mono">
                          {key.keyMasked || "sk_live_••••••••••••"}
                        </code>
                        <button
                          onClick={() => copyToClipboard(key.key || "")}
                          className="text-[#1A1A2E]/30 hover:text-[#1A1A2E] transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {key.scopes?.map((s: string) => (
                          <span
                            key={s}
                            className="text-[11px] font-medium bg-[#1A1A2E]/5 text-[#1A1A2E]/60 px-2 py-0.5 rounded uppercase"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[11px] font-medium px-2 py-1 rounded-full ${key.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                      >
                        {key.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#1A1A2E]/50">
                      {new Date(key.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-[#1A1A2E]/40 hover:text-[#1A1A2E] hover:bg-[#1A1A2E]/5 rounded transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRevoke(key.id)}
                          className="p-1.5 text-red-500/40 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal && (
        <CreateKeyModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={(key) => {
            setNewKey(key);
          }}
        />
      )}

      {newKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A2E]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4 text-[#E8A838]">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-semibold text-[#1A1A2E]">
                Store this key securely
              </h3>
            </div>
            <p className="text-[14px] text-[#1A1A2E]/60 mb-4">
              This is the only time your API key will be shown. Copy it now and
              store it in a secure location.
            </p>
            <div className="flex items-center gap-2 bg-[#1A1A2E] p-4 rounded-lg mb-6">
              <code className="flex-1 text-[#F7F5F0] font-mono text-[14px] break-all">
                {newKey}
              </code>
              <button
                onClick={() => copyToClipboard(newKey)}
                className="shrink-0 p-2 bg-white/10 hover:bg-white/20 rounded text-[#F7F5F0] transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => {
                setNewKey(null);
                setShowCreateModal(false);
                refetch();
              }}
              className="w-full bg-[#1A1A2E] text-[#F7F5F0] font-medium py-2.5 rounded-lg hover:bg-[#2d2d4e] transition-colors"
            >
              I have saved my key
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CreateKeyModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (key: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [showOverrides, setShowOverrides] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    scopes: ["read"],
    expiresAt: "",
    strategy: "token_bucket",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiRequest<{ apiKey: string }>("/api-keys/keys", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      onSuccess(res.apiKey);
    } catch (err: any) {
      alert(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A2E]/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-bold text-[#1A1A2E] tracking-[-0.02em]">
            Create API Key
          </h2>
          <button
            onClick={onClose}
            className="text-[#1A1A2E]/40 hover:text-[#1A1A2E]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[13px] font-medium text-[#1A1A2E]/70 mb-1.5 block">
              Name *
            </label>
            <input
              required
              className="w-full h-10 px-3 text-[14px] bg-white rounded-lg border border-[#1A1A2E]/10 focus:border-[#1A1A2E]/30 outline-none"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Production API Key"
            />
          </div>
          <div>
            <label className="text-[13px] font-medium text-[#1A1A2E]/70 mb-1.5 block">
              Scopes
            </label>
            <div className="flex gap-3">
              {["read", "write", "admin"].map((scope) => (
                <label
                  key={scope}
                  className="flex items-center gap-2 text-[13px] text-[#1A1A2E]/70 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.scopes.includes(scope)}
                    onChange={(e) => {
                      const newScopes = e.target.checked
                        ? [...formData.scopes, scope]
                        : formData.scopes.filter((s) => s !== scope);
                      setFormData({ ...formData, scopes: newScopes });
                    }}
                    className="rounded border-[#1A1A2E]/20"
                  />
                  {scope.charAt(0).toUpperCase() + scope.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowOverrides(!showOverrides)}
            className="w-full flex items-center justify-between text-[13px] font-medium text-[#1A1A2E]/60 hover:text-[#1A1A2E] py-2 border-t border-[#1A1A2E]/5 mt-2"
          >
            <span>Rate Limit Override (Optional)</span>
            {showOverrides ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {showOverrides && (
            <div className="space-y-3 p-4 bg-[#1A1A2E]/[0.02] rounded-lg">
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="h-9 px-3 text-[13px] bg-white rounded border border-[#1A1A2E]/10 outline-none"
                  placeholder="Req/Sec"
                  type="number"
                />
                <input
                  className="h-9 px-3 text-[13px] bg-white rounded border border-[#1A1A2E]/10 outline-none"
                  placeholder="Burst Size"
                  type="number"
                />
              </div>
              <select
                className="w-full h-9 px-3 text-[13px] bg-white rounded border border-[#1A1A2E]/10 outline-none"
                value={formData.strategy}
                onChange={(e) =>
                  setFormData({ ...formData, strategy: e.target.value })
                }
              >
                <option value="token_bucket">Token Bucket</option>
                <option value="sliding_window">Sliding Window</option>
                <option value="fixed_window">Fixed Window</option>
              </select>
            </div>
          )}

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-10 border border-[#1A1A2E]/10 rounded-lg text-[14px] font-medium text-[#1A1A2E]/70 hover:bg-[#1A1A2E]/[0.02] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 h-10 bg-[#1A1A2E] text-[#F7F5F0] rounded-lg text-[14px] font-medium hover:bg-[#2d2d4e] transition-colors flex items-center justify-center gap-2"
            >
              {loading ? "Creating..." : "Create Key"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
