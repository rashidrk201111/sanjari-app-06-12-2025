import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Globe, Save, CheckCircle2, AlertCircle, Plus, Trash2, Code } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { SEOSettings } from "../../context/AdminContext";

interface SEOSettingsTabProps {
  seoSettings: SEOSettings;
  updateSEOSettings: (settings: Partial<SEOSettings>) => void;
}

export function SEOSettingsTab({ seoSettings, updateSEOSettings }: SEOSettingsTabProps) {
  const [editedSEO, setEditedSEO] = useState(seoSettings);
  const [newMetaName, setNewMetaName] = useState("");
  const [newMetaContent, setNewMetaContent] = useState("");
  const [newLang, setNewLang] = useState("");
  const [newLangUrl, setNewLangUrl] = useState("");
  const [newNoIndexPage, setNewNoIndexPage] = useState("");
  const [newPreconnectUrl, setNewPreconnectUrl] = useState("");

  useEffect(() => {
    setEditedSEO(seoSettings);
  }, [seoSettings]);

  const handleSaveSEO = () => {
    updateSEOSettings(editedSEO);
    toast.success("SEO settings updated successfully!");
  };

  // Custom Meta Tags
  const addCustomMetaTag = () => {
    if (newMetaName && newMetaContent) {
      const customTags = [...(editedSEO.customMetaTags || []), { name: newMetaName, content: newMetaContent }];
      setEditedSEO({ ...editedSEO, customMetaTags: customTags });
      setNewMetaName("");
      setNewMetaContent("");
      toast.success("Custom meta tag added");
    }
  };

  const removeCustomMetaTag = (index: number) => {
    const customTags = [...(editedSEO.customMetaTags || [])];
    customTags.splice(index, 1);
    setEditedSEO({ ...editedSEO, customMetaTags: customTags });
    toast.success("Custom meta tag removed");
  };

  // Alternate Languages
  const addAlternateLanguage = () => {
    if (newLang && newLangUrl) {
      const altLangs = [...(editedSEO.alternateLanguages || []), { lang: newLang, url: newLangUrl }];
      setEditedSEO({ ...editedSEO, alternateLanguages: altLangs });
      setNewLang("");
      setNewLangUrl("");
      toast.success("Alternate language added");
    }
  };

  const removeAlternateLanguage = (index: number) => {
    const altLangs = [...(editedSEO.alternateLanguages || [])];
    altLangs.splice(index, 1);
    setEditedSEO({ ...editedSEO, alternateLanguages: altLangs });
    toast.success("Alternate language removed");
  };

  // No-Index Pages
  const addNoIndexPage = () => {
    if (newNoIndexPage) {
      const pages = [...(editedSEO.noIndexPages || []), newNoIndexPage];
      setEditedSEO({ ...editedSEO, noIndexPages: pages });
      setNewNoIndexPage("");
      toast.success("No-index page added");
    }
  };

  const removeNoIndexPage = (index: number) => {
    const pages = [...(editedSEO.noIndexPages || [])];
    pages.splice(index, 1);
    setEditedSEO({ ...editedSEO, noIndexPages: pages });
    toast.success("No-index page removed");
  };

  // Preconnect URLs
  const addPreconnectUrl = () => {
    if (newPreconnectUrl) {
      const urls = [...(editedSEO.preconnectUrls || []), newPreconnectUrl];
      setEditedSEO({ ...editedSEO, preconnectUrls: urls });
      setNewPreconnectUrl("");
      toast.success("Preconnect URL added");
    }
  };

  const removePreconnectUrl = (index: number) => {
    const urls = [...(editedSEO.preconnectUrls || [])];
    urls.splice(index, 1);
    setEditedSEO({ ...editedSEO, preconnectUrls: urls });
    toast.success("Preconnect URL removed");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">SEO Settings</h2>
          <p className="text-sm text-gray-600 mt-1">
            Optimize your website for search engines
          </p>
        </div>
        <Button onClick={handleSaveSEO} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save SEO Settings
        </Button>
      </div>

      {/* Basic SEO Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg text-gray-900">Basic SEO Configuration</h3>
            <p className="text-sm text-gray-600">Set default meta tags for your website</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="defaultTitle">Default Page Title</Label>
            <Input
              id="defaultTitle"
              value={editedSEO.defaultTitle}
              onChange={(e) =>
                setEditedSEO({ ...editedSEO, defaultTitle: e.target.value })
              }
              placeholder="Your Site Name - Tagline"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              This appears in browser tabs and search results (50-60 characters recommended)
            </p>
          </div>

          <div>
            <Label htmlFor="defaultDescription">Default Meta Description</Label>
            <Textarea
              id="defaultDescription"
              value={editedSEO.defaultDescription}
              onChange={(e) =>
                setEditedSEO({ ...editedSEO, defaultDescription: e.target.value })
              }
              placeholder="Brief description of your business..."
              rows={3}
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Appears in search results below the title (150-160 characters recommended)
            </p>
          </div>

          <div>
            <Label htmlFor="defaultKeywords">Default Keywords</Label>
            <Input
              id="defaultKeywords"
              value={editedSEO.defaultKeywords}
              onChange={(e) =>
                setEditedSEO({ ...editedSEO, defaultKeywords: e.target.value })
              }
              placeholder="printing, business cards, documents, online printing"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Comma-separated list of keywords (less important for modern SEO)
            </p>
          </div>

          <div>
            <Label htmlFor="author">Author / Publisher</Label>
            <Input
              id="author"
              value={editedSEO.author || ""}
              onChange={(e) =>
                setEditedSEO({ ...editedSEO, author: e.target.value })
              }
              placeholder="Sanjari Prints"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Name of the author or organization
            </p>
          </div>

          <div>
            <Label htmlFor="ogImage">Open Graph Image URL</Label>
            <Input
              id="ogImage"
              value={editedSEO.ogImage || ""}
              onChange={(e) =>
                setEditedSEO({ ...editedSEO, ogImage: e.target.value })
              }
              placeholder="https://example.com/og-image.jpg"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Image shown when sharing on social media (1200x630px recommended)
            </p>
          </div>

          <div>
            <Label htmlFor="twitterHandle">Twitter Handle</Label>
            <Input
              id="twitterHandle"
              value={editedSEO.twitterHandle || ""}
              onChange={(e) =>
                setEditedSEO({ ...editedSEO, twitterHandle: e.target.value })
              }
              placeholder="@yourhandle"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Your Twitter username for Twitter Card integration
            </p>
          </div>
        </div>
      </Card>

      {/* Advanced Meta Tags */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg text-gray-900">Advanced Meta Tags</h3>
            <p className="text-sm text-gray-600">Configure additional meta tags and settings</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="viewport">Viewport Meta Tag</Label>
              <Input
                id="viewport"
                value={editedSEO.viewport || ""}
                onChange={(e) =>
                  setEditedSEO({ ...editedSEO, viewport: e.target.value })
                }
                placeholder="width=device-width, initial-scale=1.0"
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Controls mobile responsiveness
              </p>
            </div>

            <div>
              <Label htmlFor="themeColor">Theme Color (Mobile)</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="themeColor"
                  type="color"
                  value={editedSEO.themeColor || "#2563eb"}
                  onChange={(e) =>
                    setEditedSEO({ ...editedSEO, themeColor: e.target.value })
                  }
                  className="w-16 h-10"
                />
                <Input
                  value={editedSEO.themeColor || "#2563eb"}
                  onChange={(e) =>
                    setEditedSEO({ ...editedSEO, themeColor: e.target.value })
                  }
                  placeholder="#2563eb"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Browser theme color on mobile devices
              </p>
            </div>
          </div>

          <div>
            <Label htmlFor="canonicalUrl">Canonical URL (Base)</Label>
            <Input
              id="canonicalUrl"
              value={editedSEO.canonicalUrl || ""}
              onChange={(e) =>
                setEditedSEO({ ...editedSEO, canonicalUrl: e.target.value })
              }
              placeholder="https://sanjariprints.com"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Preferred domain for SEO (helps prevent duplicate content)
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="ogType">Open Graph Type</Label>
              <Input
                id="ogType"
                value={editedSEO.ogType || ""}
                onChange={(e) =>
                  setEditedSEO({ ...editedSEO, ogType: e.target.value })
                }
                placeholder="website"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="ogSiteName">OG Site Name</Label>
              <Input
                id="ogSiteName"
                value={editedSEO.ogSiteName || ""}
                onChange={(e) =>
                  setEditedSEO({ ...editedSEO, ogSiteName: e.target.value })
                }
                placeholder="Sanjari Prints"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="ogLocale">OG Locale</Label>
              <Input
                id="ogLocale"
                value={editedSEO.ogLocale || ""}
                onChange={(e) =>
                  setEditedSEO({ ...editedSEO, ogLocale: e.target.value })
                }
                placeholder="en_IN"
                className="mt-2"
              />
            </div>
          </div>

          {/* Custom Meta Tags */}
          <div className="border-t pt-6">
            <Label>Custom Meta Tags</Label>
            <p className="text-xs text-gray-500 mb-3">
              Add custom meta tags for specific needs
            </p>
            
            <div className="space-y-3">
              {editedSEO.customMetaTags?.map((tag, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <code className="bg-gray-200 px-2 py-1 rounded">{tag.name}</code>
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{tag.content}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCustomMetaTag(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              ))}

              <div className="flex gap-2">
                <Input
                  placeholder="Meta tag name"
                  value={newMetaName}
                  onChange={(e) => setNewMetaName(e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Content"
                  value={newMetaContent}
                  onChange={(e) => setNewMetaContent(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={addCustomMetaTag} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Alternate Languages (hreflang) */}
          <div className="border-t pt-6">
            <Label>Alternate Languages (hreflang)</Label>
            <p className="text-xs text-gray-500 mb-3">
              Add alternate language versions of your pages
            </p>
            
            <div className="space-y-3">
              {editedSEO.alternateLanguages?.map((alt, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Language: <code className="bg-gray-200 px-2 py-1 rounded">{alt.lang}</code>
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{alt.url}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAlternateLanguage(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              ))}

              <div className="flex gap-2">
                <Input
                  placeholder="Language code (e.g., hi, mr)"
                  value={newLang}
                  onChange={(e) => setNewLang(e.target.value)}
                  className="w-40"
                />
                <Input
                  placeholder="URL"
                  value={newLangUrl}
                  onChange={(e) => setNewLangUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={addAlternateLanguage} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Analytics & Tracking */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg text-gray-900">Analytics & Tracking</h3>
            <p className="text-sm text-gray-600">Connect third-party analytics tools</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
            <Input
              id="googleAnalyticsId"
              value={editedSEO.googleAnalyticsId || ""}
              onChange={(e) =>
                setEditedSEO({ ...editedSEO, googleAnalyticsId: e.target.value })
              }
              placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Track website traffic and user behavior
            </p>
          </div>

          <div>
            <Label htmlFor="googleTagManagerId">Google Tag Manager ID</Label>
            <Input
              id="googleTagManagerId"
              value={editedSEO.googleTagManagerId || ""}
              onChange={(e) =>
                setEditedSEO({ ...editedSEO, googleTagManagerId: e.target.value })
              }
              placeholder="GTM-XXXXXXX"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Manage multiple tracking codes from one place
            </p>
          </div>

          <div>
            <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
            <Input
              id="facebookPixelId"
              value={editedSEO.facebookPixelId || ""}
              onChange={(e) =>
                setEditedSEO({ ...editedSEO, facebookPixelId: e.target.value })
              }
              placeholder="XXXXXXXXXXXXXXX"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Track Facebook ad conversions and website events
            </p>
          </div>
        </div>
      </Card>

      {/* Structured Data (Schema.org) */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg text-gray-900">Structured Data (Schema.org)</h3>
            <p className="text-sm text-gray-600">Add rich snippets for search engines</p>
          </div>
        </div>

        <div>
          <Label htmlFor="organizationSchema">Organization Schema (JSON-LD)</Label>
          <Textarea
            id="organizationSchema"
            value={editedSEO.organizationSchema || ""}
            onChange={(e) =>
              setEditedSEO({ ...editedSEO, organizationSchema: e.target.value })
            }
            rows={12}
            className="mt-2 font-mono text-sm"
            placeholder={`{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Your Business Name",
  ...
}`}
          />
          <p className="text-xs text-gray-500 mt-1">
            JSON-LD structured data for your organization (helps with rich snippets)
          </p>
        </div>
      </Card>

      {/* Advanced SEO Configuration */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg text-gray-900">Advanced Configuration</h3>
            <p className="text-sm text-gray-600">Configure sitemap, robots.txt, and performance</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-900">Enable XML Sitemap</p>
              <p className="text-xs text-gray-600 mt-1">
                Helps search engines discover and index your pages
              </p>
            </div>
            <Switch
              checked={editedSEO.sitemap}
              onCheckedChange={(checked) =>
                setEditedSEO({ ...editedSEO, sitemap: checked })
              }
            />
          </div>

          <div>
            <Label htmlFor="robotsTxt">Robots.txt Content</Label>
            <Textarea
              id="robotsTxt"
              value={editedSEO.robotsTxt}
              onChange={(e) =>
                setEditedSEO({ ...editedSEO, robotsTxt: e.target.value })
              }
              rows={8}
              className="mt-2 font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Control which pages search engines can crawl
            </p>
          </div>

          {/* No-Index Pages */}
          <div className="border-t pt-6">
            <Label>No-Index Pages</Label>
            <p className="text-xs text-gray-500 mb-3">
              Pages that should not be indexed by search engines
            </p>
            
            <div className="space-y-3">
              {editedSEO.noIndexPages?.map((page, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <code className="flex-1 text-sm text-gray-900">{page}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeNoIndexPage(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              ))}

              <div className="flex gap-2">
                <Input
                  placeholder="/page-path (e.g., /admin, /private)"
                  value={newNoIndexPage}
                  onChange={(e) => setNewNoIndexPage(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={addNoIndexPage} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Preconnect URLs */}
          <div className="border-t pt-6">
            <Label>Preconnect URLs (Performance)</Label>
            <p className="text-xs text-gray-500 mb-3">
              Hint browsers to establish early connections to important origins
            </p>
            
            <div className="space-y-3">
              {editedSEO.preconnectUrls?.map((url, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <code className="flex-1 text-sm text-gray-900">{url}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePreconnectUrl(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              ))}

              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com"
                  value={newPreconnectUrl}
                  onChange={(e) => setNewPreconnectUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={addPreconnectUrl} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* SEO Tips */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg text-blue-900 mb-3">🎯 Advanced SEO Best Practices</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Use unique, descriptive titles for each page (50-60 characters)</li>
          <li>• Write compelling meta descriptions that encourage clicks (150-160 characters)</li>
          <li>• Implement structured data for rich snippets in search results</li>
          <li>• Use hreflang tags for multi-language content</li>
          <li>• Set canonical URLs to prevent duplicate content issues</li>
          <li>• Add theme-color meta tag for better mobile experience</li>
          <li>• Use preconnect for external resources to improve performance</li>
          <li>• Monitor Google Search Console for indexing issues</li>
          <li>• Test structured data with Google's Rich Results Test</li>
          <li>• Keep your sitemap updated and submit to search engines</li>
        </ul>
      </Card>
    </div>
  );
}
